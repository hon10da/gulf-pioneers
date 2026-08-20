import { Router } from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/service.controller.js';
import { validateCreateService, validateUpdateService } from '../validators/service.validator.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import { protect, requireAdmin } from '../middlewares/auth.js';

const router = Router();

router.get('/', getServices);
router.get('/:id', validateObjectId(), getService);

router.post('/', protect, requireAdmin, validateCreateService, createService);
router.patch('/:id', protect, requireAdmin, validateObjectId(), validateUpdateService, updateService);
router.delete('/:id', protect, requireAdmin, validateObjectId(), deleteService);

export default router;
