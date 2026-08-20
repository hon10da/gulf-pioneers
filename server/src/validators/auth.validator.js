import { z } from 'zod';
import { AppError } from '../middlewares/errorHandler.js';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'البريد الإلكتروني مطلوب' })
    .trim()
    .toLowerCase()
    .email('صيغة البريد الإلكتروني غير صحيحة'),
  password: z
    .string({ required_error: 'كلمة المرور مطلوبة' })
    .min(1, 'كلمة المرور مطلوبة'),
});

/**
 * middleware للتحقق من body الخاص بـ /api/auth/login
 * عند النجاح: يستبدل req.body بالنسخة المنظّفة (trim + lowercase للإيميل)
 */
export const validateLogin = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.issues.map((e) => e.message).join(', ');
    return next(new AppError(message, 400));
  }

  req.body = result.data;
  next();
};
