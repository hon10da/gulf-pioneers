import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

export default async function handler(req, res) {
  console.log('VERCEL API HIT:', {
    method: req.method,
    url: req.url,
    originalUrl: req.originalUrl,
  });

  try {
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