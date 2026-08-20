import SiteSettings from '../models/SiteSettings.js';
import { AppError } from '../middlewares/errorHandler.js';

const DEFAULT_KEY = 'main';

export const getSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne({ key: DEFAULT_KEY });

    if (!settings) {
      settings = await SiteSettings.create({
        key: DEFAULT_KEY,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        settings,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const allowedFields = [
      'siteName',
      'tagline',
      'phone',
      'whatsapp',
      'email',
      'address',
      'workingHours',
      'facebook',
      'instagram',
      'twitter',
      'logo',
      'seoTitle',
      'seoDescription',
    ];

    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    if (updateData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateData.email)) {
      return next(new AppError('البريد الإلكتروني غير صحيح.', 400));
    }

    const settings = await SiteSettings.findOneAndUpdate(
      { key: DEFAULT_KEY },
      updateData,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'تم حفظ إعدادات الموقع بنجاح.',
      data: {
        settings,
      },
    });
  } catch (error) {
    next(error);
  }
};