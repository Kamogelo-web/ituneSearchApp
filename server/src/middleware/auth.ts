import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

interface AuthenticatedRequest extends Request {
  user?: jwt.JwtPayload;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      console.log('No token provided in request');
      return res.status(401).json({ message: 'No token provided' });
    }

    console.log('Verifying token:', token);
    const decoded = jwt.verify(token, config.jwt.secret);
    console.log('Token decoded successfully:', decoded);

    (req as AuthenticatedRequest).user = decoded as jwt.JwtPayload;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};