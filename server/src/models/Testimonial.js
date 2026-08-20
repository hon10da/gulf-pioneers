import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: [true, 'اسم العميل مطلوب'], trim: true },
    rating: { type: Number, required: [true, 'التقييم مطلوب'], min: 1, max: 5 },
    comment: { type: String, required: [true, 'نص التقييم مطلوب'], trim: true },
    location: { type: String, trim: true, default: '' },
    isPublished: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
