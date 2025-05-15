import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

interface SearchQuery {
  term: string;
  media?: string;
  limit?: number;
}

router.get('/', async (req: Request, res: Response) => {
  try {
    const term = req.query.term as string;
    const media = req.query.media as string | undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;

    if (!term) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term,
        media: media === 'all' ? undefined : media,
        limit
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error searching iTunes API' });
  }
});

export const searchRoutes = router; 