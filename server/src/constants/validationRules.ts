import { body } from "express-validator";

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
