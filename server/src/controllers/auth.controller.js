import { authenticateAdmin, toSafeUser } from '../services/auth.service.js';
import { COOKIE_NAME, getCookieOptions, getClearCookieOptions } from '../utils/token.js';

/**
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await authenticateAdmin(email, password);

    res.cookie(COOKIE_NAME, token, getCookieOptions());

    res.status(200).json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح.',
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/logout
 */
export const logout = (req, res, next) => {
  try {
    res.clearCookie(COOKIE_NAME, getClearCookieOptions());

    res.status(200).json({
      success: true,
      message: 'تم تسجيل الخروج بنجاح.',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/auth/me
 * يعمل بعد middleware: protect (الذي يضع req.user)
 */
export const me = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'بيانات المستخدم الحالي.',
      data: { user: toSafeUser(req.user) },
    });
  } catch (err) {
    next(err);
  }
};
