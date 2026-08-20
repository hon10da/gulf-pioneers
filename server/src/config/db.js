import mongoose from 'mongoose';

/**
 * يقرأ MONGODB_URI من environment variables ويحاول الاتصال بقاعدة البيانات.
 * لا يحتوي هذا الملف على أي credentials حقيقية — كل شيء يُقرأ من .env
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'MONGODB_URI غير موجود في environment variables. الرجاء تعيينه في server/.env'
    );
  }

  // serverSelectionTimeoutMS: عدم الانتظار لفترة طويلة جداً في حال تعذر الوصول للسيرفر
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 8000,
  });

  return mongoose.connection;
};

/**
 * يرجع حالة الاتصال الحالية بشكل نصي واضح — يُستخدم في /api/health
 */
export const getDBStatus = () => {
  const stateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return stateMap[mongoose.connection.readyState] || 'unknown';
};

/**
 * قطع الاتصال بشكل آمن — يُستخدم في graceful shutdown وفي seed scripts
 */
export const disconnectDB = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

export default connectDB;
