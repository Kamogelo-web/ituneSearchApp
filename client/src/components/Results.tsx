import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

interface MediaItem {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  kind: string;
  collectionName?: string;
  releaseDate?: string;
}

interface ResultsProps {
  results: MediaItem[];
  onAddToFavorites: (item: MediaItem) => void;
  favorites: MediaItem[];
}

const Results: React.FC<ResultsProps> = ({ results, onAddToFavorites, favorites }) => {
  const isFavorite = (item: MediaItem) => {
    return favorites.some(fav => fav.trackId === item.trackId);
  };

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {results.map((item) => (
        <Col key={item.trackId}>
          <Card className="h-100">
            <Card.Img
              variant="top"
              src={item.artworkUrl100.replace('100x100', '300x300')}
              alt={item.trackName}
            />
            <Card.Body>
              <Card.Title>{item.trackName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.artistName}
              </Card.Subtitle>
              {item.collectionName && (
                <Card.Text className="text-muted">
                  {item.collectionName}
                </Card.Text>
              )}
              {item.releaseDate && (
                <Card.Text className="text-muted small">
                  <strong>Released:</strong> {new Date(item.releaseDate).toLocaleDateString()}
                </Card.Text>
              )}
              <Button
                variant={isFavorite(item) ? "danger" : "primary"}
                onClick={() => onAddToFavorites(item)}
                className="w-100"
              >
                {isFavorite(item) ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Results; 