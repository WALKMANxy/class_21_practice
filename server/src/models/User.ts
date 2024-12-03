// src/models/User.ts
import bcrypt from "bcryptjs";
import { CallbackError, Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  surname?: string;
  avatar?: string;
  refreshTokens: string[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    surname: { type: String },
    avatar: { type: String },
    refreshTokens: [{ type: String }],
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

// Hash password before saving the user
userSchema.pre<IUser>("save", async function (next) {
  const user = this as IUser;

  if (!user.isModified("password") || !user.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

// Compare password method
userSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.index({ email: 1 });

export const User = model<IUser>("User", userSchema);
