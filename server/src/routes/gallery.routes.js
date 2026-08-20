import { Router } from 'express';
import {
  getGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../controllers/gallery.controller.js';
import { validateCreateGallery, validateUpdateGallery } from '../validators/gallery.validator.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import { protect, requireAdmin } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const router = Router();

router.get('/', getGalleryItems);
router.get('/:id', validateObjectId(), getGalleryItem);

router.post(
  '/',
  protect,
  requireAdmin,
  upload.single('image'),
  validateCreateGallery,
  createGalleryItem
);
router.patch(
  '/:id',
  protect,
  requireAdmin,
  validateObjectId(),
  upload.single('image'),
  validateUpdateGallery,
  updateGalleryItem
);
router.delete('/:id', protect, requireAdmin, validateObjectId(), deleteGalleryItem);

export default router;
