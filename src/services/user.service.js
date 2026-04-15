import bcrypt from "bcryptjs"
import { prisma } from "../lib/prisma.js"
import { AppError } from "../utils/error.js"

export async function createUser(username, fullName, password) {
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    return prisma.user.create({
      data: {
        username,
        fullName,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    })
  } catch (err) {
    if (err.code === "P2002") {
      throw new AppError("Username already exists", 409)
    }
    throw err
  }
}

export async function findUserById(id, omitPsw=true) {
  return prisma.user.findUnique({
    where: { id },
    omit: {
      password: omitPsw,
    },
  })
}

export async function findUserByUsername(username, omitPsw=true) {
  return prisma.user.findUnique({
    where: { username },
    omit: {
      password: omitPsw,
    },
  })
}
