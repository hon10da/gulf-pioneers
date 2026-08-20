import { Router } from 'express';
import {
  createQuote,
  getQuotes,
  getQuote,
  updateQuoteStatus,
  deleteQuote,
} from '../controllers/quote.controller.js';
import { validateCreateQuote, validateUpdateQuote } from '../validators/quote.validator.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import { protect, requireAdmin } from '../middlewares/auth.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

// عام — العميل يرسل طلب عرض سعر. نستخدم authLimiter نفسه لمنع الإغراق (Spam)
router.post('/', authLimiter, validateCreateQuote, createQuote);

// Admin
router.get('/', protect, requireAdmin, getQuotes);
router.get('/:id', protect, requireAdmin, validateObjectId(), getQuote);
router.patch('/:id', protect, requireAdmin, validateObjectId(), validateUpdateQuote, updateQuoteStatus);
router.delete('/:id', protect, requireAdmin, validateObjectId(), deleteQuote);

export default router;
