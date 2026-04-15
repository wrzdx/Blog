import { matchedData, validationResult } from "express-validator"
import { AppError } from "../utils/error.js"

export const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(
      new AppError(
        errors
          .array()
          .map((err) => err.msg)
          .join(", "),
        400,
      ),
    )
  }
  req.validated = matchedData(req)
  next()
}
