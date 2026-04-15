import { body } from "express-validator"

export const validateRegister = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage(
      "Username must be at least 3 characters and at most 255 characters long",
    )
    .escape(),
  body("fullName")
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage(
      "Full Name must be at least 3 characters and at most 255 characters long",
    )
    .escape(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
]
