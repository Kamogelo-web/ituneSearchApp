import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

interface SearchProps {
  onSearch: (term: string, mediaType: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, mediaType);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search iTunes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          style={{ maxWidth: '200px' }}
        >
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="podcast">Podcasts</option>
          <option value="music">Music</option>
          <option value="audiobook">Audiobooks</option>
          <option value="shortFilm">Short Films</option>
          <option value="tvShow">TV Shows</option>
          <option value="software">Software</option>
          <option value="ebook">E-books</option>
        </Form.Select>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default Search; 