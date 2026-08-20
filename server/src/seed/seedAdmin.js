// Script لإنشاء أول Admin user في قاعدة البيانات.
// تشغيله: npm run seed:admin
//
// يعتمد بالكامل على متغيرات البيئة التالية (يجب تعيينها في server/.env):
//   ADMIN_NAME=...
//   ADMIN_EMAIL=...
//   ADMIN_PASSWORD=...
//
// لا يحتوي هذا الملف على أي email أو password حقيقيين.

import 'dotenv/config';
import { connectDB, disconnectDB } from '../config/db.js';
import User from '../models/User.js';
import { hashPassword } from '../utils/password.js';

const run = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error(
      '❌ يجب تعيين ADMIN_NAME و ADMIN_EMAIL و ADMIN_PASSWORD في server/.env قبل تشغيل الـ seed.'
    );
    process.exit(1);
  }

  try {
    await connectDB();
    console.log('MongoDB connected.');

    const normalizedEmail = ADMIN_EMAIL.toLowerCase().trim();

    // منع إنشاء Admin مكرر بنفس الـ email
    const existingAdmin = await User.findOne({ email: normalizedEmail });
    if (existingAdmin) {
      console.log(`ℹ️  يوجد Admin مسبقاً بهذا البريد: ${normalizedEmail}. تم تجاهل العملية.`);
      await disconnectDB();
      process.exit(0);
    }

    const passwordHash = await hashPassword(ADMIN_PASSWORD);

    const admin = await User.create({
      name: ADMIN_NAME,
      email: normalizedEmail,
      passwordHash,
      role: 'admin',
    });

    console.log(`✅ تم إنشاء Admin بنجاح: ${admin.email} (id: ${admin._id})`);

    await disconnectDB();
    process.exit(0);
  } catch (err) {
    console.error('❌ فشل تنفيذ الـ seed:', err.message);
    await disconnectDB();
    process.exit(1);
  }
};

run();
