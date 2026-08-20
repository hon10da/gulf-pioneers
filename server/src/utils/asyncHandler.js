/**
 * يغلّف async controller ويمرر أي خطأ لـ next() تلقائياً،
 * بنفس فلسفة try/catch + next(err) المستخدمة في auth.controller.js
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
