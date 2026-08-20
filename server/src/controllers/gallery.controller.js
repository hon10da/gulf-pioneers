import GalleryItem from '../models/GalleryItem.js';
import { AppError } from '../middlewares/errorHandler.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getAll, getOne } from '../utils/handlerFactory.js';
import { uploadBufferToCloudinary, deleteFromCloudinary } from '../utils/cloudinaryHelpers.js';

// GET /api/gallery (عام)
export const getGalleryItems = getAll(GalleryItem, { sort: 'order -createdAt' });

// GET /api/gallery/:id (عام)
export const getGalleryItem = getOne(GalleryItem);

// POST /api/gallery (admin) — multipart/form-data مع حقل 'image'
export const createGalleryItem = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('صورة المعرض مطلوبة.', 400));
  }

  const result = await uploadBufferToCloudinary(req.file.buffer);

  const item = await GalleryItem.create({
    ...req.body,
    imageUrl: result.secure_url,
    cloudinaryPublicId: result.public_id,
  });

  res.status(201).json({ success: true, message: 'تم إضافة الصورة بنجاح.', data: { item } });
});

// PATCH /api/gallery/:id (admin) — صورة جديدة اختيارية
export const updateGalleryItem = asyncHandler(async (req, res, next) => {
  const existing = await GalleryItem.findById(req.params.id);
  if (!existing) return next(new AppError('العنصر غير موجود.', 404));

  const updates = { ...req.body };

  if (req.file) {
    const result = await uploadBufferToCloudinary(req.file.buffer);
    updates.imageUrl = result.secure_url;
    updates.cloudinaryPublicId = result.public_id;

    // نحذف الصورة القديمة من Cloudinary بعد نجاح رفع الجديدة
    await deleteFromCloudinary(existing.cloudinaryPublicId);
  }

  const item = await GalleryItem.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, message: 'تم التحديث بنجاح.', data: { item } });
});

// DELETE /api/gallery/:id (admin) — يحذف من Cloudinary أولاً ثم من MongoDB
export const deleteGalleryItem = asyncHandler(async (req, res, next) => {
  const item = await GalleryItem.findById(req.params.id);
  if (!item) return next(new AppError('العنصر غير موجود.', 404));

  await deleteFromCloudinary(item.cloudinaryPublicId);
  await item.deleteOne();

  res.status(200).json({ success: true, message: 'تم الحذف بنجاح.', data: null });
});
