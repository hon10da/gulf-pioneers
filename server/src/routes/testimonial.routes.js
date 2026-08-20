import { Router } from 'express';
import {
  getPublishedTestimonials,
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonial.controller.js';
import {
  validateCreateTestimonial,
  validateUpdateTestimonial,
} from '../validators/testimonial.validator.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import { protect, requireAdmin } from '../middlewares/auth.js';

const router = Router();

router.get('/', getPublishedTestimonials);
router.get('/admin', protect, requireAdmin, getAllTestimonialsAdmin);

router.post('/', protect, requireAdmin, validateCreateTestimonial, createTestimonial);
router.patch('/:id', protect, requireAdmin, validateObjectId(), validateUpdateTestimonial, updateTestimonial);
router.delete('/:id', protect, requireAdmin, validateObjectId(), deleteTestimonial);

export default router;
