import QuoteRequest from '../models/QuoteRequest.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from '../utils/handlerFactory.js';

// POST /api/quotes (عام) — العميل يرسل طلب عرض سعر
export const createQuote = createOne(QuoteRequest);

// Admin
export const getQuotes = getAll(QuoteRequest, { sort: '-createdAt' });
export const getQuote = getOne(QuoteRequest);
export const updateQuoteStatus = updateOne(QuoteRequest);
export const deleteQuote = deleteOne(QuoteRequest);
