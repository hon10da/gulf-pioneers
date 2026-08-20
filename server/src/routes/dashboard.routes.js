import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller.js';
import { protect, requireAdmin } from '../middlewares/auth.js';

const router = Router();

router.get('/', protect, requireAdmin, getDashboardStats);

export default router;
