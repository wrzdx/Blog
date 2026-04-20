import jwt from "jsonwebtoken"
import { findUserById } from "../services/user.service.js"
import { AppError } from "../utils/error.js"

export const authorize = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return next(new AppError("Unauthorized", 401))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await findUserById(decoded.id)
    if (!user) {
      return next(new AppError("Unauthorized", 401))
    }
    req.user = user
    next()
  } catch (err) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    })

    return next(new AppError("Unauthorized", 401))
  }
}

export const authorizeOptional = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return next()
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await findUserById(decoded.id)

    if (user) {
      req.user = user
    }
  } catch (err) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    })
  }

  next()
}
