import { z } from 'zod';
import { AppError } from '../middlewares/errorHandler.js';

const baseSchema = {
  customerName: z.string({ required_error: 'اسم العميل مطلوب' }).trim().min(1),
  rating: z.coerce
    .number({ required_error: 'التقييم مطلوب' })
    .int('التقييم يجب أن يكون رقماً صحيحاً')
    .min(1, 'التقييم يجب أن يكون بين 1 و5')
    .max(5, 'التقييم يجب أن يكون بين 1 و5'),
  comment: z.string({ required_error: 'نص التقييم مطلوب' }).trim().min(1),
  location: z.string().trim().optional(),
  isPublished: z.coerce.boolean().optional(),
  order: z.coerce.number().optional(),
};

export const createTestimonialSchema = z.object(baseSchema);
export const updateTestimonialSchema = z.object(baseSchema).partial();

const buildValidator = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues.map((e) => e.message).join(', ');
    return next(new AppError(message, 400));
  }
  req.body = result.data;
  next();
};

export const validateCreateTestimonial = buildValidator(createTestimonialSchema);
export const validateUpdateTestimonial = buildValidator(updateTestimonialSchema);
