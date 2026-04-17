import { body } from "express-validator"

export const validateRegister = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Username must be at least 3 characters and at most 50 characters long",
    )
    .escape(),
  body("fullName")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Full Name must be at least 3 characters and at most 50 characters long",
    )
    .escape(),
  body("password")
    .isLength({ min: 8, max: 50 })
    .withMessage(
      "Password must be at least 8 characters and at most 50 characters long",
    ),
]
