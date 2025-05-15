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

interface FavoritesProps {
  favorites: MediaItem[];
  onRemoveFromFavorites: (item: MediaItem) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, onRemoveFromFavorites }) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center text-muted my-5">
        <h3>No favorites yet</h3>
        <p>Add some items to your favorites list!</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="mb-4">Favorites</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {favorites.map((item) => (
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
                  variant="danger"
                  onClick={() => onRemoveFromFavorites(item)}
                  className="w-100"
                >
                  Remove from Favorites
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Favorites; 