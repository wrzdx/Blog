import { prisma } from "../lib/prisma.js"

export async function createPost(user, title, content, published = false) {
  return await prisma.post.create({
    data: {
      author: {
        connect: { id: user.id },
      },
      title,
      content,
      published,
    },
    include: {
      author: true,
    },
  })
}

export async function getPosts(limit = 10, ascending = false) {
  return await prisma.post.findMany()
}
