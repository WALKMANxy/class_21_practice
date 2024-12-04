// src/models/UserProfile.ts
import { Document, Schema, model, Types } from "mongoose";

export interface IUserProfile extends Document {
  user: Types.ObjectId; // Reference to the User model
  paymentMethods: PaymentMethod[];
  fullAddress: Address;
  favourites: string[]; // Array of Product IDs
}

interface PaymentMethod {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string; // Format: MM/YY
  cvv: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const paymentMethodSchema = new Schema<PaymentMethod>(
  {
    cardNumber: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
  },
  { _id: false }
);

const addressSchema = new Schema<Address>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const userProfileSchema = new Schema<IUserProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    paymentMethods: { type: [paymentMethodSchema], default: [] },
    fullAddress: { type: addressSchema, required: true },
    favourites: { type: [String], default: [] }, 
  },
  { timestamps: true }
);

export const UserProfile = model<IUserProfile>("UserProfile", userProfileSchema);
