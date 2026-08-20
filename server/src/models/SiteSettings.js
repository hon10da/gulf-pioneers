import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: 'main',
      unique: true,
      immutable: true,
    },

    siteName: {
      type: String,
      default: 'رواد الخليج',
      trim: true,
    },

    tagline: {
      type: String,
      default: 'نقل وتغليف الأثاث',
      trim: true,
    },

    phone: {
      type: String,
      default: '',
      trim: true,
    },

    whatsapp: {
      type: String,
      default: '',
      trim: true,
    },

    email: {
      type: String,
      default: '',
      trim: true,
    },

    address: {
      type: String,
      default: '',
      trim: true,
    },

    workingHours: {
      type: String,
      default: '',
      trim: true,
    },

    facebook: {
      type: String,
      default: '',
      trim: true,
    },

    instagram: {
      type: String,
      default: '',
      trim: true,
    },

    twitter: {
      type: String,
      default: '',
      trim: true,
    },

    logo: {
      type: String,
      default: '',
      trim: true,
    },

    seoTitle: {
      type: String,
      default: '',
      trim: true,
    },

    seoDescription: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export default SiteSettings;