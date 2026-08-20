import User from '../models/User.js';
import { verifyToken, COOKIE_NAME } from '../utils/token.js';
import { AppError } from './errorHandler.js';

/**
 * middleware: يتحقق أن المستخدم مسجّل دخول عبر JWT المخزّن في httpOnly cookie.
 * عند النجاح: يضيف req.user (بدون passwordHash)
 */
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];

    if (!token) {
      throw new AppError('غير مصرح. الرجاء تسجيل الدخول.', 401);
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      throw new AppError('جلسة غير صالحة أو منتهية. الرجاء تسجيل الدخول مرة أخرى.', 401);
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError('المستخدم لم يعد موجوداً.', 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * middleware: يجب استخدامه بعد protect.
 * يتحقق أن المستخدم الحالي له role = 'admin'.
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new AppError('غير مسموح. صلاحية Admin مطلوبة.', 403));
  }
  next();
};
