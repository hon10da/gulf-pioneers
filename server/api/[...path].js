import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

export default async function handler(req, res) {
  console.log('VERCEL API HIT:', {
    method: req.method,
    url: req.url,
    query: req.query,
  });

  try {
    // Vercel catch-all puts the dynamic path in req.query.path.
    // Rebuild the original URL so Express can match its routes correctly.
    const path = req.query?.path;

    if (path) {
      const parts = Array.isArray(path) ? path : [path];

      const query = new URLSearchParams();

      for (const [key, value] of Object.entries(req.query || {})) {
        if (key === 'path') continue;

        if (Array.isArray(value)) {
          value.forEach((v) => query.append(key, v));
        } else if (value !== undefined) {
          query.append(key, value);
        }
      }

      const queryString = query.toString();

      req.url = `/api/${parts.join('/')}${
        queryString ? `?${queryString}` : ''
      };
    }

    await connectDB();

    return app(req, res);
  } catch (error) {
    console.error('Database connection failed:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
    });
  }
}