/**
 * كلاس خطأ موحّد يُستخدم في كل المشروع بدل رمي Error عادي.
 * يحمل statusCode واضح ليستخدمه errorHandler.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // خطأ متوقع (مثل validation) وليس bug غير متوقع
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * middleware لأي route غير موجود — يُستدعى بعد كل الـ routes
 */
export const notFound = (req, res, next) => {
  next(new AppError(`الـ route غير موجود - ${req.originalUrl}`, 404));
};

/**
 * middleware مركزي لمعالجة كل الأخطاء بشكل موحّد.
 * لازم يكون آخر middleware في app.js (بعد كل الـ routes).
 *
 * شكل الاستجابة في حالة الخطأ:
 * { success: false, message: "...", error: {...} }
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;
  let message = err.message || 'حدث خطأ في السيرفر';

  // أخطاء Mongoose الشائعة → تحويلها لرسائل واضحة بدل تسريب تفاصيل داخلية
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `قيمة غير صالحة لـ ${err.path}`;
  }
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0];
    message = `القيمة موجودة مسبقاً${field ? ` لحقل ${field}` : ''}`;
  }
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    error:
      process.env.NODE_ENV === 'production'
        ? {}
        : { stack: err.stack, name: err.name },
  });
};
