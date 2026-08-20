import { Router } from 'express';
import {
  getSettings,
  updateSettings,
} from '../controllers/settings.controller.js';
import { protect, requireAdmin } from '../middlewares/auth.js';

const router = Router();

// Public
router.get('/', getSettings);

// Admin only
router.patch('/', protect, requireAdmin, updateSettings);

export default router;
