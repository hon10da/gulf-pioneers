import Service from '../models/Service.js';
import GalleryItem from '../models/GalleryItem.js';
import Testimonial from '../models/Testimonial.js';
import FAQ from '../models/FAQ.js';
import QuoteRequest from '../models/QuoteRequest.js';
import ContactMessage from '../models/ContactMessage.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// GET /api/admin/dashboard (admin)
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalServices,
    activeServices,
    galleryCount,
    publishedTestimonials,
    publishedFaqs,
    pendingQuotes,
    newContactMessages,
    recentQuotes,
    recentMessages,
  ] = await Promise.all([
    Service.countDocuments(),
    Service.countDocuments({ isActive: true }),
    GalleryItem.countDocuments(),
    Testimonial.countDocuments({ isPublished: true }),
    FAQ.countDocuments({ isPublished: true }),
    QuoteRequest.countDocuments({ status: 'pending' }),
    ContactMessage.countDocuments({ status: 'new' }),
    QuoteRequest.find().sort('-createdAt').limit(5),
    ContactMessage.find().sort('-createdAt').limit(5),
  ]);

  res.status(200).json({
    success: true,
    message: 'تم جلب الإحصائيات بنجاح.',
    data: {
      totalServices,
      activeServices,
      galleryCount,
      publishedTestimonials,
      publishedFaqs,
      pendingQuotes,
      newContactMessages,
      recentQuotes,
      recentMessages,
    },
  });
});
