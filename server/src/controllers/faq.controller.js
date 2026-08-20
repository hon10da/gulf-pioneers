import FAQ from '../models/FAQ.js';
import { getAll, createOne, updateOne, deleteOne } from '../utils/handlerFactory.js';

// GET /api/faqs (عام) — المنشورة فقط
export const getPublishedFaqs = getAll(FAQ, { filter: { isPublished: true }, sort: 'order -createdAt' });

// GET /api/faqs/admin (admin) — الكل
export const getAllFaqsAdmin = getAll(FAQ, { sort: '-createdAt' });

// Admin
export const createFaq = createOne(FAQ);
export const updateFaq = updateOne(FAQ);
export const deleteFaq = deleteOne(FAQ);
