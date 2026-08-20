import mongoose from 'mongoose';

export const QUOTE_STATUSES = ['pending', 'contacted', 'completed', 'cancelled'];

const quoteRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'الاسم مطلوب'], trim: true },
    phone: { type: String, required: [true, 'رقم الجوال مطلوب'], trim: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    service: { type: String, trim: true, default: '' },
    fromLocation: { type: String, trim: true, default: '' },
    toLocation: { type: String, trim: true, default: '' },
    movingDate: { type: Date },
    furnitureType: { type: String, trim: true, default: '' },
    notes: { type: String, trim: true, default: '' },
    status: { type: String, enum: QUOTE_STATUSES, default: 'pending' },
  },
  { timestamps: true }
);

const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);
export default QuoteRequest;
