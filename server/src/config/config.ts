import dotenv from 'dotenv';
dotenv.config();

export interface Config {
  jwt: {
    secret: string;
    expiresIn: string;
  };
  server: {
    port: number;
    corsOrigins: string[];
  };
  itunes: {
    baseUrl: string;
    timeout: number;
  };
}

const config: Config = {
  jwt: {
    secret: process.env.JWT_SECRET || 'your-256-bit-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  },
  server: {
    port: parseInt(process.env.PORT || '5001'),
    corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000']
  },
  itunes: {
    baseUrl: 'https://itunes.apple.com',
    timeout: parseInt(process.env.API_TIMEOUT || '5000')
  }
};

export default config;
