// src/services/userProfileService.ts
import { UserProfile, IUserProfile } from "../models/UserProfile";

interface PaymentMethodInput {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
}

interface AddressInput {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export const createUserProfile = async (
  userId: string,
  address: AddressInput,
  paymentMethods: PaymentMethodInput[] = []
): Promise<IUserProfile> => {
  const existingProfile = await UserProfile.findOne({ user: userId });
  if (existingProfile) {
    throw new Error("UserProfile already exists for this user.");
  }

  const profile = new UserProfile({
    user: userId,
    fullAddress: address,
    paymentMethods,
    favourites: [],
  });

  return await profile.save();
};

export const getUserProfile = async (userId: string): Promise<IUserProfile | null> => {
  return await UserProfile.findOne({ user: userId });
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<{
    paymentMethods: PaymentMethodInput[];
    fullAddress: AddressInput;
    favourites: string[];
  }>
): Promise<IUserProfile | null> => {
  return await UserProfile.findOneAndUpdate({ user: userId }, updates, { new: true });
};

export const addToFavourites = async (userId: string, productId: string): Promise<IUserProfile | null> => {
  return await UserProfile.findOneAndUpdate(
    { user: userId },
    { $addToSet: { favourites: productId } }, // Prevent duplicates
    { new: true }
  );
};

export const removeFromFavourites = async (userId: string, productId: string): Promise<IUserProfile | null> => {
  return await UserProfile.findOneAndUpdate(
    { user: userId },
    { $pull: { favourites: productId } },
    { new: true }
  );
};
