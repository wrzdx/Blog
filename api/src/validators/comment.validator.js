import { body, param } from "express-validator"

export const validateCreateComment = [
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Content is required"),
]

export const validateCommentId = [
  param("commentId").isInt().withMessage("Invalid comment id").toInt(),
]
