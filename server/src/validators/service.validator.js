import { z } from 'zod';
import { AppError } from '../middlewares/errorHandler.js';

const baseSchema = {
  title: z.string({ required_error: 'العنوان مطلوب' }).trim().min(1, 'العنوان مطلوب'),
  slug: z
    .string({ required_error: 'الـ slug مطلوب' })
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, 'الـ slug يجب أن يحتوي أحرف/أرقام إنجليزية وشرطات فقط'),
  shortDescription: z.string({ required_error: 'الوصف المختصر مطلوب' }).trim().min(1),
  description: z.string().trim().optional(),
  icon: z.string().trim().optional(),
  image: z.string().trim().optional(),
  features: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
};

export const createServiceSchema = z.object(baseSchema);
export const updateServiceSchema = z.object(baseSchema).partial();

const buildValidator = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues.map((e) => e.message).join(', ');
    return next(new AppError(message, 400));
  }
  req.body = result.data;
  next();
};

export const validateCreateService = buildValidator(createServiceSchema);
export const validateUpdateService = buildValidator(updateServiceSchema);
