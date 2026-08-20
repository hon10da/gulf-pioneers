import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, 'السؤال مطلوب'], trim: true },
    answer: { type: String, required: [true, 'الإجابة مطلوبة'], trim: true },
    category: { type: String, trim: true, default: '' },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;
