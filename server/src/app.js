import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import { apiLimiter } from './middlewares/rateLimiter.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import { getDBStatus } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import serviceRoutes from './routes/service.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import faqRoutes from './routes/faq.routes.js';
import quoteRoutes from './routes/quote.routes.js';
import contactRoutes from './routes/contact.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import settingsRoutes from './routes/settings.routes.js';

const app = express();
app.set('trust proxy', 1);

// ---- Security Headers ----
app.use(helmet());

// ---- CORS ----
// مسموح فقط لـ CLIENT_URL المحدد في environment variables — ليس "*"
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // مطلوب لإرسال/استقبال httpOnly cookies
  })
);

// ---- Body / Cookie Parsing ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---- Logging (development only) ----
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ---- Rate Limiting (كل مسارات /api) ----
app.use('/api', apiLimiter);

// ---- Health Check ----
// يعرض حالة السيرفر وحالة قاعدة البيانات بوضوح، بدون إخفاء أي خطأ اتصال
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      server: 'ok',
      database: getDBStatus(),
    },
  });
});

// ---- Auth Routes ----
app.use('/api/auth', authRoutes);

// ---- Feature Routes ----
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/settings', settingsRoutes);

// /api/settings سيُضاف في مرحلة لاحقة

// ---- 404 + Centralized Error Handling ----
app.use(notFound);
app.use(errorHandler);

export default app;
