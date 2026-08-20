import { Router } from 'express';
import { login, logout, me } from '../controllers/auth.controller.js';
import { validateLogin } from '../validators/auth.validator.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.post('/login', authLimiter, validateLogin, login);
router.post('/logout', logout);
router.get('/me', protect, me);

export default router;
