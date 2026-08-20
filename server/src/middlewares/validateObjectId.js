import mongoose from 'mongoose';
import { AppError } from './errorHandler.js';

export const validateObjectId = (paramName = 'id') => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
    return next(new AppError('معرف غير صالح.', 400));
  }
  next();
};
