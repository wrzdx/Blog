import bcrypt from "bcryptjs"
import { prisma } from "../lib/prisma.js"

async function createUser(username, fullName, password) {
  const hashedPassword = await bcrypt.hash(password, 10)
  return await prisma.user.create({
    data: {
      username,
      fullName,
      password: hashedPassword,
    },
  })
}

export default { createUser }
