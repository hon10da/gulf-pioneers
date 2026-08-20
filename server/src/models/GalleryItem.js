import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'العنوان مطلوب'], trim: true },
    description: { type: String, trim: true, default: '' },
    imageUrl: { type: String, required: [true, 'رابط الصورة مطلوب'] },
    cloudinaryPublicId: { type: String, required: [true, 'معرّف Cloudinary مطلوب'] },
    category: { type: String, trim: true, default: '' },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
export default GalleryItem;
