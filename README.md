# iTunes Search App

## Overview
The iTunes Search App is a full-stack web application that allows users to search for content from the iTunes Store, including music, movies, podcasts, audiobooks, and more. Users can browse search results, view detailed information about each item, and save their favorite content for later reference.

![iTunes Search App Screenshot](https://via.placeholder.com/800x450.png?text=iTunes+Search+App)

## Features
- **Content Search**: Search across various media types in the iTunes catalog
- **Media Filtering**: Filter search results by media type (music, movies, podcasts, etc.)
- **Favorites Management**: Add/remove items to your favorites list
- **Responsive Design**: Works on desktop and mobile devices
- **Release Date Information**: View when content was released
- **Authentication**: Secure API access with JWT authentication

## Technology Stack
- **Frontend**: React, TypeScript, Bootstrap
- **Backend**: Node.js, Express, TypeScript
- **API**: iTunes Search API
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/itunes-search-app.git
cd itunes-search-app
```

#### 2. Install and run the backend server
```bash
cd server
npm install
# Create a .env file with your JWT secret
echo "JWT_SECRET=your-strong-secret-here-at-least-32-chars" > .env
# Start the server
npm run start
```

The server will run on http://localhost:5001 by default.

#### 3. Install and run the frontend client
```bash
cd ../client
npm install
# Start the development server
npm start
```

The client will run on http://localhost:3000 by default.

## Usage

### Authentication
The application uses JWT authentication to secure API requests. A token is automatically generated and used for all API calls.

### Searching Content
1. Enter a search term in the search box
2. Select a media type from the dropdown (All, Music, Movies, etc.)
3. Click the "Search" button
4. Browse through the search results

### Managing Favorites
- Click "Add to Favorites" on any item to save it to your favorites list
- Click "Remove from Favorites" to remove an item from your favorites
- Your favorites list is displayed below the search results

## Development

### Backend Structure
- `/server/src/routes` - API route definitions
- `/server/src/middleware` - Authentication and other middleware
- `/server/src/config` - Application configuration

### Frontend Structure
- `/client/src/components` - React components
- `/client/src/App.tsx` - Main application component

### Available Scripts

#### Backend
- `npm run start` - Start the server
- `npm run dev` - Start the server with nodemon for development
- `npm run build` - Build the TypeScript code

#### Frontend
- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm test` - Run tests

## License
MIT

## Acknowledgements
- [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html) for providing the content data
- [React](https://reactjs.org/) and [Bootstrap](https://getbootstrap.com/) for the frontend framework and UI components
