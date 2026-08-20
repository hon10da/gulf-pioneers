import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.js';
import { AppError } from '../middlewares/errorHandler.js';

const FOLDER = 'gulf-pioneers/gallery';

/**
 * يرفع buffer الصورة (من multer memoryStorage) مباشرة لـ Cloudinary
 * بدون تخزين أي بيانات ثنائية في MongoDB — فقط الـ URL والـ public_id يُحفظان.
 */
export const uploadBufferToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: FOLDER, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(new AppError('فشل رفع الصورة إلى Cloudinary.', 502));
        resolve(result);
      }
    );
    Readable.from(buffer).pipe(uploadStream);
  });
};

/**
 * يحذف صورة من Cloudinary باستخدام public_id المحفوظ في MongoDB
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    // لا نوقف العملية لو فشل حذف الصورة القديمة من Cloudinary (مثلاً صورة محذوفة أصلاً)
    // eslint-disable-next-line no-console
    console.error('تحذير: فشل حذف صورة من Cloudinary:', err.message);
  }
};
