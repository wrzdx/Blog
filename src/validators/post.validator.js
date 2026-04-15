import { body, param } from "express-validator"

export const validateCreatePost = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage(
      "Title must be at least 3 characters and at most 255 characters long",
    )
    .escape(),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Content is required"),
  body("published")
    .isBoolean()
    .withMessage("Published must be a boolean")
    .toBoolean(),
]

export const validatePostId = [
  param("postId").isInt().withMessage("Invalid post id").toInt(),
]

export const validateUpdatePost = [
  body("title")
    .trim()
    .optional()
    .isLength({ min: 3, max: 255 })
    .withMessage(
      "Title must be at least 3 characters and at most 255 characters long",
    )
    .escape(),
  body("content")
    .trim()
    .optional()
    .isLength({ min: 1 })
    .withMessage("Content is required"),
  body("published")
    .isBoolean()
    .optional()
    .withMessage("Published must be a boolean")
    .toBoolean(),
]
