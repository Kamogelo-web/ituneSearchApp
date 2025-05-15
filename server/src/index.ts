import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config/config';
import { searchRoutes } from './routes/search';
import { authMiddleware } from './middleware/auth';

console.log('JWT Secret in use:', config.jwt.secret);

dotenv.config();

const app = express();

// Get port from command line arguments or environment variable
const args = process.argv.slice(2);
let port = parseInt(process.env.PORT || '5000');

// Check if --port argument exists
const portIndex = args.indexOf('--port');
if (portIndex !== -1 && args[portIndex + 1]) {
  port = parseInt(args[portIndex + 1]);
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/search', authMiddleware, searchRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Function to start server with port retry
const startServer = (initialPort: number) => {
  const server = app.listen(initialPort, () => {
    console.log(`Server is running on port ${initialPort}`);
  }).on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${initialPort} is in use, trying ${initialPort + 1}`);
      startServer(initialPort + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(port); 