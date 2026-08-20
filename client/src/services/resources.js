// طبقة API مركزية لكل الموارد — تُستخدم في صفحات الأدمن والموقع العام معاً
import api from './api';

export const servicesApi = {
  list: () => api.get('/services'),
  get: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.patch(`/services/${id}`, data),
  remove: (id) => api.delete(`/services/${id}`),
};

export const galleryApi = {
  list: () => api.get('/gallery'),
  create: (formData) =>
    api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) =>
    api.patch(`/gallery/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/gallery/${id}`),
};

export const testimonialsApi = {
  listPublished: () => api.get('/testimonials'),
  listAdmin: () => api.get('/testimonials/admin'),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.patch(`/testimonials/${id}`, data),
  remove: (id) => api.delete(`/testimonials/${id}`),
};

export const faqsApi = {
  listPublished: () => api.get('/faqs'),
  listAdmin: () => api.get('/faqs/admin'),
  create: (data) => api.post('/faqs', data),
  update: (id, data) => api.patch(`/faqs/${id}`, data),
  remove: (id) => api.delete(`/faqs/${id}`),
};

export const quotesApi = {
  create: (data) => api.post('/quotes', data),
  list: () => api.get('/quotes'),
  update: (id, data) => api.patch(`/quotes/${id}`, data),
  remove: (id) => api.delete(`/quotes/${id}`),
};

export const contactApi = {
  create: (data) => api.post('/contact', data),
  list: () => api.get('/contact'),
  update: (id, data) => api.patch(`/contact/${id}`, data),
  remove: (id) => api.delete(`/contact/${id}`),
};

export const dashboardApi = {
  stats: () => api.get('/admin/dashboard'),
};
export const settingsApi = {
  get: () => api.get('/settings'),
  update: (data) => api.patch('/settings', data),
};