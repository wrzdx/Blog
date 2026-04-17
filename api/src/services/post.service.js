import { prisma } from "../prisma/client.js"

export async function createPost(userId, title, content, published, imageUrl) {
  return prisma.post.create({
    data: {
      author: {
        connect: { id: userId },
      },
      title,
      content,
      published,
      imageUrl,
    },
    include: {
      author: true,
    },
  })
}

export async function getPosts(filterOptions = null) {
  return prisma.post.findMany({
    where: filterOptions || {},
    orderBy: { createdAt: "desc" },
    omit: { content: true },
    include: {
      author: true,
    },
  })
}

export async function getPost(id) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
    },
  })
}

export async function updatePost(id, title, content, published, imageUrl) {
  return prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      published,
      imageUrl,
    },
  })
}

export async function deletePost(id) {
  return prisma.post.delete({
    where: { id },
  })
}
