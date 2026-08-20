import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'العنوان مطلوب'], trim: true },
    slug: { type: String, required: [true, 'الـ slug مطلوب'], unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: [true, 'الوصف المختصر مطلوب'], trim: true },
    description: { type: String, trim: true, default: '' },
    icon: { type: String, trim: true, default: '' },
    image: { type: String, trim: true, default: '' },
    features: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
