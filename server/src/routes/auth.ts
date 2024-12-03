// src/routes/auth.ts
import { Router } from "express";

import {
  login,
  logout,
  refreshSession,
  register,
} from "../controllers/authController";
import { authRateLimiter } from "../middlewares/rateLimiter";
import { checkValidation } from "../middlewares/validate";
import {
  loginValidationRules,
  registerValidationRules,
} from "../constants/validationRules";

const router = Router();

// User Registration
router.post(
  "/register",
  registerValidationRules,
  authRateLimiter,
  checkValidation,
  register
);

// User Login
router.post(
  "/login",
  loginValidationRules,
  authRateLimiter,
  checkValidation,
  login
);

// User Logout
router.post("/logout", authRateLimiter, logout);

// Refresh Session Token
router.post("/refresh-session", authRateLimiter, refreshSession);

export default router;
