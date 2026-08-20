import Testimonial from '../models/Testimonial.js';
import { getAll, createOne, updateOne, deleteOne } from '../utils/handlerFactory.js';

// GET /api/testimonials (عام) — المنشورة فقط
export const getPublishedTestimonials = getAll(Testimonial, {
  filter: { isPublished: true },
  sort: 'order -createdAt',
});

// GET /api/testimonials/admin (admin) — الكل، بما فيها غير المنشورة، لإدارتها
export const getAllTestimonialsAdmin = getAll(Testimonial, { sort: '-createdAt' });

// Admin
export const createTestimonial = createOne(Testimonial);
export const updateTestimonial = updateOne(Testimonial);
export const deleteTestimonial = deleteOne(Testimonial);
