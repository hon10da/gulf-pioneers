import { Router } from 'express';
import {
  createContactMessage,
  getContactMessages,
  getContactMessage,
  updateContactMessageStatus,
  deleteContactMessage,
} from '../controllers/contact.controller.js';
import { validateCreateContact, validateUpdateContact } from '../validators/contact.validator.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import { protect, requireAdmin } from '../middlewares/auth.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

// عام
router.post('/', authLimiter, validateCreateContact, createContactMessage);

// Admin
router.get('/', protect, requireAdmin, getContactMessages);
router.get('/:id', protect, requireAdmin, validateObjectId(), getContactMessage);
router.patch(
  '/:id',
  protect,
  requireAdmin,
  validateObjectId(),
  validateUpdateContact,
  updateContactMessageStatus
);
router.delete('/:id', protect, requireAdmin, validateObjectId(), deleteContactMessage);

export default router;
