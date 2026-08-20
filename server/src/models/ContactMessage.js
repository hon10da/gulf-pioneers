import mongoose from 'mongoose';

export const CONTACT_STATUSES = ['new', 'read', 'replied', 'archived'];

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'الاسم مطلوب'], trim: true },
    phone: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, lowercase: true, default: '' },
    subject: { type: String, trim: true, default: '' },
    message: { type: String, required: [true, 'الرسالة مطلوبة'], trim: true },
    status: { type: String, enum: CONTACT_STATUSES, default: 'new' },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;
