import { authorize } from "../middleware/auth.js"
import { getPost } from "../services/post.service.js"
import * as commentService from "../services/comment.service.js"
import {
  validateCommentId,
  validateCreateComment,
} from "../validators/comment.validator.js"
import { validate } from "../middleware/validate.js"
import { AppError } from "../utils/error.js"

export const createComment = [
  authorize,
  validateCreateComment,
  validate,
  async (req, res) => {
    const { content, postId } = req.validated
    const post = await getPost(postId)
    if (!post) {
      throw new AppError("Post not found", 404)
    }
    if (!post.published && post.authorId !== req.user.id) {
      throw new AppError("Forbidden", 403)
    }
    return res
      .status(201)
      .json(await commentService.createComment(req.user.id, postId, content))
  },
]

export const getPostComments = [
  validate,
  async (req, res) => {
    const { postId } = req.validated
    const post = await getPost(postId)
    if (!post) {
      throw new AppError("Post not found", 404)
    }
    if (!post.published && post.authorId !== req.user.id) {
      throw new AppError("Forbidden", 403)
    }
    return res.json(await commentService.getPostComments(postId))
  },
]

export const deleteComment = [
  authorize,
  validateCommentId,
  validate,
  async (req, res) => {
    const { postId, commentId } = req.validated
    const comment = await commentService.getComment(commentId)
    if (!comment || comment.postId !== postId) {
      throw new AppError("Comment not found", 404)
    }
    if (comment.authorId !== req.user.id) {
      throw new AppError("Forbidden", 403)
    }
    await commentService.deleteComment(commentId)
    return res.status(204).send()
  },
]
