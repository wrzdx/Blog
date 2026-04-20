import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { validateRegister } from "../validators/user.validator.js"
import { createUser, findUserByUsername } from "../services/user.service.js"
import { AppError } from "../utils/error.js"
import { authorize } from "../middleware/auth.js"
import { validate } from "../middleware/validate.js"

export const me = [
  authorize,
  async (req, res) => {
    return res.json({ user: req.user })
  },
]
export const login = async (req, res) => {
  const { username, password } = req.body
  const user = await findUserByUsername(username, true)
  if (!user) {
    throw new AppError("Invalid credentials", 401)
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw new AppError("Invalid credentials", 401)
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  })

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })

  return res.status(200).json({
    user: {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      isAuthor: user.isAuthor,
    },
  })
}

export const register = [
  validateRegister,
  validate,
  async (req, res) => {
    const { username, fullName, password } = req.validated

    const user = await createUser(username, fullName, password)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return res.status(201).json({ user })
  },
]

export const logout = [
  authorize,
  (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return res.status(204).send()
  },
]
