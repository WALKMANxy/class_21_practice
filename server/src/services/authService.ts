import { IUser, User } from "../models/User";

// Function to validate password strength
const validatePassword = (password: string): string | null => {
  const errors: string[] = [];
  if (password.length < 8)
    errors.push("Password must be at least 8 characters long.");
  if (!/[A-Z]/.test(password))
    errors.push("Password must contain at least one uppercase letter.");
  if (!/[a-z]/.test(password))
    errors.push("Password must contain at least one lowercase letter.");
  if (!/[0-9]/.test(password))
    errors.push("Password must contain at least one number.");
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    errors.push("Password must contain at least one special character.");

  return errors.length > 0 ? errors.join(" ") : null;
};

// Register a new user
export const registerUserService = async (
  email: string,
  password: string,
  name: string,
  surname?: string
): Promise<IUser> => {
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists.");
  }

  // Validate the password
  const passwordValidationError = validatePassword(password);
  if (passwordValidationError) {
    throw new Error(passwordValidationError);
  }

  // Create and save the new user
  const user = new User({
    email,
    password,
    name,
    surname,
  });

  await user.save();
  return user;
};

// Log in a user
export const loginUserService = async (
  email: string,
  password: string
): Promise<IUser | null> => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }

  // Compare the provided password with the hashed password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return null;
  }

  return user;
};
