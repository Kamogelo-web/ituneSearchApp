// Frontend-safe configuration
export const JWT_CONFIG = {

  expiresIn: '1h'
};

export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5001',
  endpoints: {
    search: '/api/search',
    auth: '/api/auth'
  }
};

export const APP_CONFIG = {
  maxFavorites: 50,
  defaultMediaType: 'music'
};