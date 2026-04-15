import { prisma } from "../prisma/client.js"

export async function createComment(userId, postId, content) {
  return prisma.comment.create({
    data: {
      author: {
        connect: {
          id: userId,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
      content,
    },
    include: {
      author: true,
      post: {
        omit: {
          content: true,
        },
      },
    },
  })
}

export async function getPostComments(postId) {
  return prisma.comment.findMany({ where: { postId } })
}

export async function getComment(id) {
  return prisma.comment.findUnique({ where: { id } })
}

export async function deleteComment(id) {
  return prisma.comment.delete({ where: { id } })
}
