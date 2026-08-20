import Service from '../models/Service.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../utils/handlerFactory.js';

// GET /api/services (عام) — فقط الخدمات المفعّلة، مرتبة حسب order
export const getServices = getAll(Service, { filter: { isActive: true }, sort: 'order -createdAt' });

// GET /api/services/:id (عام) — بدون فلترة isActive حتى تعمل صفحة تفاصيل الخدمة ولوحة التحكم معاً
export const getService = getOne(Service);

// Admin
export const createService = createOne(Service);
export const updateService = updateOne(Service);
export const deleteService = deleteOne(Service);
