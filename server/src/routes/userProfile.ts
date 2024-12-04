// src/routes/userProfileRoutes.ts
import express from "express";
import {
  handleCreateUserProfile,
  handleGetUserProfile,
  handleUpdateUserProfile,
  handleAddToFavourites,
  handleRemoveFromFavourites,
} from "../controllers/userProfileController";
import { authenticateUser } from "../middlewares/authentication";
import {
  validateAddToFavourites,
  validateCreateUserProfile,
  validateRemoveFromFavourites,
  validateUpdateUserProfile,
} from "../constants/validationRules";
import { checkValidation } from "../middlewares/validate";

const router = express.Router();

// Create User Profile
router.post(
  "/",
  authenticateUser,
  validateCreateUserProfile,
  checkValidation,
  handleCreateUserProfile
);

// Get User Profile
router.get("/", authenticateUser, handleGetUserProfile);

// Update User Profile
router.patch(
  "/",
  authenticateUser,
  validateUpdateUserProfile,
  checkValidation,
  handleUpdateUserProfile
);

// Add to Favourites
router.post(
  "/favourites",
  authenticateUser,
  validateAddToFavourites,
  checkValidation,
  handleAddToFavourites
);

// Remove from Favourites
router.delete(
  "/favourites",
  authenticateUser,
  validateRemoveFromFavourites,
  checkValidation,
  handleRemoveFromFavourites
);

export default router;
