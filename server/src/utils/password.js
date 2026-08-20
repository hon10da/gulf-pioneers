import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

/**
 * يشفّر كلمة مرور نصية ويرجع الـ hash الجاهز للحفظ في قاعدة البيانات
 * @param {string} plainPassword
 * @returns {Promise<string>}
 */
export const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

/**
 * يقارن كلمة مرور نصية مع الـ hash المخزّن
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
