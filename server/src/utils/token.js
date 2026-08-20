import jwt from 'jsonwebtoken';

export const COOKIE_NAME = 'gp_token';

/**
 * ينشئ JWT موقّع لمستخدم معيّن
 * @param {{ id: string, role: string }} payload
 * @returns {string}
 */
export const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET غير موجود في environment variables');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * يتحقق من صحة JWT ويرجع الـ payload، أو يرمي خطأ لو غير صالح/منتهي
 * @param {string} token
 */
export const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET غير موجود في environment variables');
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * إعدادات الـ httpOnly cookie التي سيُخزَّن بها الـ JWT.
 * - httpOnly: true → غير قابل للوصول من JavaScript (حماية من XSS) — بديل عن localStorage
 * - secure: true فقط في production (يتطلب HTTPS)
 * - sameSite: strict في production لمنع CSRF، lax في development لسهولة الاختبار المحلي
 */
export const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 أيام
    path: '/',
  };
};

/**
 * نفس إعدادات الأمان أعلاه لكن بدون maxAge — تُستخدم مع res.clearCookie()
 * عند تسجيل الخروج، حتى تتطابق خصائص الـ cookie تماماً فيتم مسحها فعلياً من المتصفح.
 */
export const getClearCookieOptions = () => {
  const { maxAge, ...rest } = getCookieOptions();
  return rest;
};
