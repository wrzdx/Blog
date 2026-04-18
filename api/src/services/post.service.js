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
      comments: {
        include: {
          author: true,
        },
      },
    },
  })
}

export async function updatePost(id, data) {
  return prisma.post.update({
    where: { id },
    data,
  })
}

export async function deletePost(id) {
  return prisma.post.delete({
    where: { id },
  })
}
