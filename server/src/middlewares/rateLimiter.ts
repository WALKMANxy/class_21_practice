// src/middlewares/rateLimiter.ts
import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, 
  message: {
    error:
      "Too many authentication attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, 
  message: {
    error:
      "Too many requests. Please try again after 15 minutes.",
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});