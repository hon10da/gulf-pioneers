import rateLimit from 'express-rate-limit';

/**
 * Rate limiter عام يُطبّق على كل /api
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'عدد كبير من الطلبات، الرجاء المحاولة لاحقاً.',
  },
});

/**
 * Rate limiter أكثر صرامة، مُعدّ لاستخدامه لاحقاً على route الـ login
 * (وأي route حساس مثل Quote/Contact forms) لمنع brute-force وSpam
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'محاولات كثيرة جداً، الرجاء المحاولة لاحقاً.',
  },
});
