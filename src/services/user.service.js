import bcrypt from "bcryptjs"
import { prisma } from "../prisma/client.js"
import { AppError } from "../utils/error.js"

export async function createUser(username, fullName, password) {
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    return await prisma.user.create({
      data: {
        username,
        fullName,
        password: hashedPassword,
      },
    })
  } catch (err) {
    if (err.code === "P2002") {
      throw new AppError("Username already exists", 409)
    }
    throw err
  }
}

export async function findUserById(id, includePsw = false) {
  return prisma.user.findUnique({
    where: { id },
    omit: {
      password: !includePsw,
    },
  })
}

export async function findUserByUsername(username, includePsw = false) {
  return prisma.user.findUnique({
    where: { username },
    omit: {
      password: !includePsw,
    },
  })
}
