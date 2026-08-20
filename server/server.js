import 'dotenv/config';
import app from './src/app.js';
import { connectDB, disconnectDB } from './src/config/db.js';

const PORT = process.env.PORT || 5000;

let httpServer;

const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully.');
  } catch (err) {
    // لا نُخفي الخطأ، لكن لا نمنع السيرفر من العمل — health check سيعرض
    // الحالة الحقيقية لقاعدة البيانات، والـ routes التي تحتاج DB ستفشل بوضوح
    console.error('MongoDB connection failed:', err.message);
    console.error(
      'السيرفر سيستمر بالعمل، لكن أي عملية تحتاج قاعدة بيانات ستفشل حتى يتم إصلاح MONGODB_URI.'
    );
  }

  httpServer = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();

// ---- Graceful Shutdown ----
const shutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);

  if (httpServer) {
    httpServer.close(async () => {
      try {
        await disconnectDB();
        console.log('MongoDB disconnected. HTTP server closed. Bye 👋');
        process.exit(0);
      } catch (err) {
        console.error('Error during graceful shutdown:', err.message);
        process.exit(1);
      }
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
