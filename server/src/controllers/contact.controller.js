import ContactMessage from '../models/ContactMessage.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../utils/handlerFactory.js';

// POST /api/contact (عام)
export const createContactMessage = createOne(ContactMessage);

// Admin
export const getContactMessages = getAll(ContactMessage, { sort: '-createdAt' });
export const getContactMessage = getOne(ContactMessage);
export const updateContactMessageStatus = updateOne(ContactMessage);
export const deleteContactMessage = deleteOne(ContactMessage);
