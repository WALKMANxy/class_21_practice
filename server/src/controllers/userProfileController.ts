// src/controllers/userProfileController.ts
import { Response } from "express";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  addToFavourites,
  removeFromFavourites,
} from "../services/userProfileService";
import { AuthenticatedRequest } from "../models/Types";

// Create User Profile
export const handleCreateUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res
        .status(401)
        .json({ message: "Unauthorized access. User ID is missing." });
    }

    const { fullAddress, paymentMethods } = req.body;
    const profile = await createUserProfile(
      userId,
      fullAddress,
      paymentMethods
    );
    res.status(201).json(profile);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get User Profile
export const handleGetUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res
        .status(401)
        .json({ message: "Unauthorized access. User ID is missing." });
    }
    const profile = await getUserProfile(userId);
    if (!profile) {
      res.status(404).json({ message: "UserProfile not found." });
    }
    res.status(200).json(profile);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update User Profile
export const handleUpdateUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res
        .status(401)
        .json({ message: "Unauthorized access. User ID is missing." });
    }
    const updates = req.body;

    const updatedProfile = await updateUserProfile(userId, updates);
    if (!updatedProfile) {
      res.status(404).json({ message: "UserProfile not found." });
    }
    res.status(200).json(updatedProfile);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Add to Favourites
export const handleAddToFavourites = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res
        .status(401)
        .json({ message: "Unauthorized access. User ID is missing." });
    }
    const { productId } = req.body;

    if (!productId) {
      res.status(400).json({ message: "Product ID is required." });
    }

    const updatedProfile = await addToFavourites(userId, productId);
    if (!updatedProfile) {
      res.status(404).json({ message: "UserProfile not found." });
    }

    if (updatedProfile) {
      res.status(200).json({ favourites: updatedProfile.favourites });
    } else {
      res.status(404).json({ message: "UserProfile not found." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from Favourites
export const handleRemoveFromFavourites = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res
        .status(401)
        .json({ message: "Unauthorized access. User ID is missing." });
    }
    const { productId } = req.body;

    if (!productId) {
      res.status(400).json({ message: "Product ID is required." });
    }

    const updatedProfile = await removeFromFavourites(userId, productId);
    if (!updatedProfile) {
      res.status(404).json({ message: "UserProfile not found." });
    }

    if (updatedProfile) {
      res.status(200).json({ favourites: updatedProfile.favourites });
    } else {
      res.status(404).json({ message: "UserProfile not found." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
