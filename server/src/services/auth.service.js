import User from '../models/User.js';
import { comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/token.js';
import { AppError } from '../middlewares/errorHandler.js';

// رسالة عامة واحدة سواء كان الإيميل غير موجود أو كانت كلمة المرور خاطئة،
// حتى لا نسرّب لمهاجم محتمل معلومة "هل هذا الإيميل مسجّل في النظام أصلاً"
const INVALID_CREDENTIALS_MESSAGE = 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';

/**
 * يحوّل مستند User إلى object آمن للعرض (بدون passwordHash نهائياً)
 */
export const toSafeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

/**
 * يتحقق من email/password ويرجع JWT + بيانات مستخدم آمنة عند النجاح.
 * يرمي AppError(401) برسالة عامة عند فشل التحقق (إيميل غير موجود أو باسورد خاطئ).
 */
export const authenticateAdmin = async (email, password) => {
  // passwordHash عليه select:false في الـ Model، لازم نطلبه صراحةً هنا فقط
  const user = await User.findOne({ email }).select('+passwordHash');

  if (!user) {
    throw new AppError(INVALID_CREDENTIALS_MESSAGE, 401);
  }

  const isMatch = await comparePassword(password, user.passwordHash);
  if (!isMatch) {
    throw new AppError(INVALID_CREDENTIALS_MESSAGE, 401);
  }

  const token = generateToken({ id: user._id.toString(), role: user.role });

  return { token, user: toSafeUser(user) };
};
