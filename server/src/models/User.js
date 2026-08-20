import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'الاسم مطلوب'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'البريد الإلكتروني مطلوب'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      // select: false يمنع رجوع الـ hash افتراضياً في أي query عادي
      // (لازم .select('+passwordHash') صراحةً عند الحاجة، مثلاً في تسجيل الدخول)
      select: false,
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
  },
  {
    timestamps: true, // ينشئ createdAt و updatedAt تلقائياً
  }
);

const User = mongoose.model('User', userSchema);

export default User;
