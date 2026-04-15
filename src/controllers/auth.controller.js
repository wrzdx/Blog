import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { matchedData, validationResult } from "express-validator"
import { validateRegister } from "../validators/user.validator.js"
import { createUser, findUserByUsername } from "../services/user.service.js"
import { AppError } from "../utils/error.js"
import { authorize } from "../middlewares/auth.js"

export const me = [
  authorize,
  async (req, res) => {
    return res.json({ user: req.user })
  },
]
export const login = async (req, res) => {
  const { username, password } = req.body
  const user = await findUserByUsername(username, false)
  if (!user) {
    throw new AppError("Invalid credentials", 401)
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw new AppError("Invalid credentials", 401)
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "10000",
  })

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })

  return res.status(200).json({
    message: "User logged in",
    user: {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
    },
  })
}

export const register = [
  validateRegister,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ messages: errors.array().map((err) => err.msg) })
    }

    const { username, fullName, password } = matchedData(req)
    const user = await createUser(username, fullName, password)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    return res.status(201).json({ message: "User created", user })
  },
]

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })

  return res.status(200).json({ message: "Logged out" })
}
