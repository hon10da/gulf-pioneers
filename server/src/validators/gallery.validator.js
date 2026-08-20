import { z } from 'zod';
import { AppError } from '../middlewares/errorHandler.js';

const baseSchema = {
  title: z.string({ required_error: 'العنوان مطلوب' }).trim().min(1, 'العنوان مطلوب'),
  description: z.string().trim().optional(),
  category: z.string().trim().optional(),
  isFeatured: z.coerce.boolean().optional(),
  order: z.coerce.number().optional(),
};

export const createGallerySchema = z.object(baseSchema);
export const updateGallerySchema = z.object(baseSchema).partial();

const buildValidator = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues.map((e) => e.message).join(', ');
    return next(new AppError(message, 400));
  }
  req.body = result.data;
  next();
};

export const validateCreateGallery = buildValidator(createGallerySchema);
export const validateUpdateGallery = buildValidator(updateGallerySchema);
