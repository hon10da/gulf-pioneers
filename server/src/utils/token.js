import jwt from 'jsonwebtoken';

export const COOKIE_NAME = 'gp_token';

export const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET غير موجود في environment variables');
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET غير موجود في environment variables');
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  };
};

export const getClearCookieOptions = () => {
  const { maxAge, ...rest } = getCookieOptions();
  return rest;
};