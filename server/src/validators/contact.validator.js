import { z } from 'zod';
import { AppError } from '../middlewares/errorHandler.js';
import { CONTACT_STATUSES } from '../models/ContactMessage.js';

export const createContactSchema = z.object({
  name: z.string({ required_error: 'الاسم مطلوب' }).trim().min(1),
  phone: z.string().trim().optional(),
  email: z.string().trim().toLowerCase().email('صيغة البريد الإلكتروني غير صحيحة').optional().or(z.literal('')),
  subject: z.string().trim().optional(),
  message: z.string({ required_error: 'الرسالة مطلوبة' }).trim().min(1),
});

export const updateContactSchema = z.object({
  status: z.enum(CONTACT_STATUSES, { message: `status يجب أن يكون أحد: ${CONTACT_STATUSES.join(', ')}` }),
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

export const validateCreateContact = buildValidator(createContactSchema);
export const validateUpdateContact = buildValidator(updateContactSchema);
