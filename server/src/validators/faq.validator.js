import { z } from 'zod';
import { AppError } from '../middlewares/errorHandler.js';

const baseSchema = {
  question: z.string({ required_error: 'السؤال مطلوب' }).trim().min(1),
  answer: z.string({ required_error: 'الإجابة مطلوبة' }).trim().min(1),
  category: z.string().trim().optional(),
  isPublished: z.coerce.boolean().optional(),
  order: z.coerce.number().optional(),
};

export const createFaqSchema = z.object(baseSchema);
export const updateFaqSchema = z.object(baseSchema).partial();

const buildValidator = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues.map((e) => e.message).join(', ');
    return next(new AppError(message, 400));
  }
  req.body = result.data;
  next();
};

export const validateCreateFaq = buildValidator(createFaqSchema);
export const validateUpdateFaq = buildValidator(updateFaqSchema);
