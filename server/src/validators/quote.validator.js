import { z } from 'zod';
import { AppError } from '../middlewares/errorHandler.js';
import { QUOTE_STATUSES } from '../models/QuoteRequest.js';

// السعودية: يقبل صيغ شائعة مثل 05XXXXXXXX أو +9665XXXXXXXX
const phoneRegex = /^(\+?966|0)?5\d{8}$/;

export const createQuoteSchema = z.object({
  name: z.string({ required_error: 'الاسم مطلوب' }).trim().min(1),
  phone: z
    .string({ required_error: 'رقم الجوال مطلوب' })
    .trim()
    .regex(phoneRegex, 'صيغة رقم الجوال غير صحيحة'),
  email: z.string().trim().toLowerCase().email('صيغة البريد الإلكتروني غير صحيحة').optional().or(z.literal('')),
  service: z.string().trim().optional(),
  fromLocation: z.string().trim().optional(),
  toLocation: z.string().trim().optional(),
  movingDate: z.coerce.date().optional(),
  furnitureType: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

export const updateQuoteSchema = z.object({
  status: z.enum(QUOTE_STATUSES, { message: `status يجب أن يكون أحد: ${QUOTE_STATUSES.join(', ')}` }),
});

const buildValidator = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues.map((e) => e.message).join(', ');
    return next(new AppError(message, 400));
  }
  req.body = result.data;
  next();
};

export const validateCreateQuote = buildValidator(createQuoteSchema);
export const validateUpdateQuote = buildValidator(updateQuoteSchema);
