import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import axios from 'axios';
import Search from './components/Search';
import Results from './components/Results';
import Favorites from './components/Favorites';
import 'bootstrap/dist/css/bootstrap.min.css';

interface MediaItem {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  kind: string;
  collectionName?: string;
}

interface iTunesResponse {
  resultCount: number;
  results: MediaItem[];
}

// For development, we'll use a hardcoded token
// In production, this should be properly managed
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsImlhdCI6MTc0NzI2OTAwMSwiZXhwIjoxNzQ5ODYxMDAxfQ.PjvUL1UQ-1wR4-Yw_1W_rkgeFIZiPXK_91YoJG8W43E';
const API_URL = 'http://localhost:5001/api';

const App: React.FC = () => {
  const [results, setResults] = useState<MediaItem[]>([]);
  const [favorites, setFavorites] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (term: string, mediaType: string) => {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);

    try {
      console.log('Searching with params:', { term, mediaType });
      console.log('Using token:', JWT_TOKEN);
      
      // Use our backend's /api/search endpoint instead of iTunes API directly
      const response = await axios.get<iTunesResponse>(`${API_URL}/search`, {
        params: {
          term,
          media: mediaType,
          limit: 20
        },
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`
        }
      });

      console.log('Search response:', response.data);
      setResults(response.data.results);
    } catch (error: any) {
      console.error('Search error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        setError(`Error: ${error.response.data.message || 'Failed to fetch results'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        setError('No response from server. Please check if the server is running.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        setError('Failed to fetch results. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = (item: MediaItem) => {
    if (favorites.some(fav => fav.trackId === item.trackId)) {
      setFavorites(favorites.filter(fav => fav.trackId !== item.trackId));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">iTunes Search App</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Search onSearch={handleSearch} />
        
        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <Results
            results={results}
            onAddToFavorites={handleAddToFavorites}
            favorites={favorites}
          />
        )}

        <Favorites
          favorites={favorites}
          onRemoveFromFavorites={handleAddToFavorites}
        />
      </Container>
    </div>
  );
};

export default App;
