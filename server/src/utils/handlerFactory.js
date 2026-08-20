import { AppError } from '../middlewares/errorHandler.js';
import { asyncHandler } from './asyncHandler.js';

/**
 * دوال CRUD عامة قابلة لإعادة الاستخدام مع أي Mongoose Model.
 * تحافظ على نفس شكل الاستجابة الموحّد { success, message, data } المستخدم في auth.controller.js
 */

export const getAll = (Model, { filter = {}, sort = '-createdAt' } = {}) =>
  asyncHandler(async (req, res) => {
    const finalFilter = typeof filter === 'function' ? filter(req) : filter;
    const items = await Model.find(finalFilter).sort(sort);
    res.status(200).json({
      success: true,
      message: 'تم جلب البيانات بنجاح.',
      data: { count: items.length, items },
    });
  });

export const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const item = await Model.findById(req.params.id);
    if (!item) return next(new AppError('العنصر غير موجود.', 404));
    res.status(200).json({ success: true, message: 'تم جلب العنصر بنجاح.', data: { item } });
  });

export const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json({ success: true, message: 'تم الإنشاء بنجاح.', data: { item } });
  });

export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return next(new AppError('العنصر غير موجود.', 404));
    res.status(200).json({ success: true, message: 'تم التحديث بنجاح.', data: { item } });
  });

export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return next(new AppError('العنصر غير موجود.', 404));
    res.status(200).json({ success: true, message: 'تم الحذف بنجاح.', data: null });
  });
