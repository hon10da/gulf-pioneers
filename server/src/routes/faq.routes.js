import { Router } from 'express';
import {
  getPublishedFaqs,
  getAllFaqsAdmin,
  createFaq,
  updateFaq,
  deleteFaq,
} from '../controllers/faq.controller.js';
import { validateCreateFaq, validateUpdateFaq } from '../validators/faq.validator.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import { protect, requireAdmin } from '../middlewares/auth.js';

const router = Router();

router.get('/', getPublishedFaqs);
router.get('/admin', protect, requireAdmin, getAllFaqsAdmin);

router.post('/', protect, requireAdmin, validateCreateFaq, createFaq);
router.patch('/:id', protect, requireAdmin, validateObjectId(), validateUpdateFaq, updateFaq);
router.delete('/:id', protect, requireAdmin, validateObjectId(), deleteFaq);

export default router;
