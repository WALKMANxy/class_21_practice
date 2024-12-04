// src/routes/auth.ts
import { Router } from "express";

import {
  login,
  logout,
  refreshSession,
  register,
} from "../controllers/authController";
import { authRateLimiter, rateLimiter } from "../middlewares/rateLimiter";
import { checkValidation } from "../middlewares/validate";
import {
  loginValidationRules,
  registerValidationRules,
} from "../constants/validationRules";
import { UserController } from "../controllers/userController";
import { authenticateUser } from "../middlewares/authentication";

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
  rateLimiter,
  checkValidation,
  login
);

// User Logout
router.post("/logout", authRateLimiter, logout);

// Refresh Session Token
router.post("/refresh-session", authRateLimiter, refreshSession);

router.get("/:id", authRateLimiter, authenticateUser, UserController.getUserById)

export default router;
