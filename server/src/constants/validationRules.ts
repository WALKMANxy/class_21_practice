import { body } from "express-validator";
import mongoose from "mongoose";

export const registerValidationRules = [
  body("email").isEmail().withMessage("Invalid email."),
  body("name").isLength({ min: 1 }).withMessage("Name is required."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least 1 uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least 1 lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least 1 number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least 1 special character."),
];

export const loginValidationRules = [
  body("email").isEmail().withMessage("Invalid email."),
  body("password").exists().withMessage("Password is required."),
];


// Regular expressions for validation
const cardNumberRegex = /^\d{16}$/; // Simple regex for 16-digit card numbers
const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
const cvvRegex = /^\d{3,4}$/; // 3 or 4 digits

// Validation for creating a user profile
export const validateCreateUserProfile = [
  // fullAddress validation
  body("fullAddress").exists().withMessage("Full address is required."),
  body("fullAddress.street")
    .isString()
    .withMessage("Street must be a string.")
    .trim()
    .notEmpty()
    .withMessage("Street cannot be empty."),
  body("fullAddress.city")
    .isString()
    .withMessage("City must be a string.")
    .trim()
    .notEmpty()
    .withMessage("City cannot be empty."),
  body("fullAddress.state")
    .isString()
    .withMessage("State must be a string.")
    .trim()
    .notEmpty()
    .withMessage("State cannot be empty."),
  body("fullAddress.postalCode")
    .isPostalCode("any")
    .withMessage("Invalid postal code."),
  body("fullAddress.country")
    .isString()
    .withMessage("Country must be a string.")
    .trim()
    .notEmpty()
    .withMessage("Country cannot be empty."),

  // paymentMethods validation (optional)
  body("paymentMethods")
    .optional()
    .isArray()
    .withMessage("Payment methods must be an array."),
  body("paymentMethods.*.cardNumber")
    .matches(cardNumberRegex)
    .withMessage("Card number must be a 16-digit number."),
  body("paymentMethods.*.cardHolderName")
    .isString()
    .withMessage("Card holder name must be a string.")
    .trim()
    .notEmpty()
    .withMessage("Card holder name cannot be empty."),
  body("paymentMethods.*.expiryDate")
    .matches(expiryDateRegex)
    .withMessage("Expiry date must be in MM/YY format.")
    .custom((value) => {
      const [month, year] = value.split("/").map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % 100; // Get last two digits
      const currentMonth = now.getMonth() + 1; // Months are 0-based

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        throw new Error("Expiry date must be in the future.");
      }
      return true;
    }),
  body("paymentMethods.*.cvv")
    .matches(cvvRegex)
    .withMessage("CVV must be 3 or 4 digits."),
];

// Validation for updating a user profile
export const validateUpdateUserProfile = [
  // fullAddress validation (optional)
  body("fullAddress").optional(),
  body("fullAddress.street")
    .optional()
    .isString()
    .withMessage("Street must be a string.")
    .trim()
    .notEmpty()
    .withMessage("Street cannot be empty."),
  body("fullAddress.city")
    .optional()
    .isString()
    .withMessage("City must be a string.")
    .trim()
    .notEmpty()
    .withMessage("City cannot be empty."),
  body("fullAddress.state")
    .optional()
    .isString()
    .withMessage("State must be a string.")
    .trim()
    .notEmpty()
    .withMessage("State cannot be empty."),
  body("fullAddress.postalCode")
    .optional()
    .isPostalCode("any")
    .withMessage("Invalid postal code."),
  body("fullAddress.country")
    .optional()
    .isString()
    .withMessage("Country must be a string.")
    .trim()
    .notEmpty()
    .withMessage("Country cannot be empty."),

  // paymentMethods validation (optional)
  body("paymentMethods")
    .optional()
    .isArray()
    .withMessage("Payment methods must be an array."),
  body("paymentMethods.*.cardNumber")
    .optional()
    .matches(cardNumberRegex)
    .withMessage("Card number must be a 16-digit number."),
  body("paymentMethods.*.cardHolderName")
    .optional()
    .isString()
    .withMessage("Card holder name must be a string.")
    .trim()
    .notEmpty()
    .withMessage("Card holder name cannot be empty."),
  body("paymentMethods.*.expiryDate")
    .optional()
    .matches(expiryDateRegex)
    .withMessage("Expiry date must be in MM/YY format.")
    .custom((value) => {
      const [month, year] = value.split("/").map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % 100; // Get last two digits
      const currentMonth = now.getMonth() + 1; // Months are 0-based

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        throw new Error("Expiry date must be in the future.");
      }
      return true;
    }),
  body("paymentMethods.*.cvv")
    .optional()
    .matches(cvvRegex)
    .withMessage("CVV must be 3 or 4 digits."),
];

// Validation for adding to favourites
export const validateAddToFavourites = [
  body("productId")
    .exists()
    .withMessage("Product ID is required.")
    .bail()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid Product ID."),
];

// Validation for removing from favourites
export const validateRemoveFromFavourites = [
  body("productId")
    .exists()
    .withMessage("Product ID is required.")
    .bail()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid Product ID."),
];