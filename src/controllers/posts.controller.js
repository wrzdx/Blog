import { matchedData, validationResult } from "express-validator"
import { authorize, authorizeOptional } from "../middleware/auth.js"
import * as postService from "../services/post.service.js"
import { AppError } from "../utils/error.js"
import {
  validateCreatePost,
  validatePostId,
  validateUpdatePost,
} from "../validators/post.validator.js"
import { validate } from "../middleware/validate.js"

export const createPost = [
  authorize,
  validateCreatePost,
  validate,
  async (req, res) => {
    const { title, content, published } = req.validated
    return res
      .status(201)
      .json(await postService.createPost(req.user, title, content, published))
  },
]

export const getPosts = [
  async (req, res) => {
    return res.json(await postService.getPosts({ published: true }))
  },
]

export const getMyPosts = [
  authorize,
  async (req, res) => {
    return res.json(await postService.getPosts({ authorId: req.user.id }))
  },
]

export const getPost = [
  authorizeOptional,
  validatePostId,
  validate,
  async (req, res) => {
    const { id } = req.validated
    const post = await postService.getPost(id)
    if (!post) {
      throw new AppError("Post not found", 404)
    }
    if (!post.published) {
      if (!req.user || post.authorId !== req.user.id) {
        throw new AppError("Forbidden", 403)
      }
    }
    return res.json(post)
  },
]

export const updatePost = [
  authorize,
  validatePostId,
  validateUpdatePost,
  validate,
  async (req, res) => {
    const { id, title, content, published } = req.validated
    const post = await postService.getPost(id)
    if (!post || post.authorId !== req.user.id) {
      throw new AppError("Forbidden", 403)
    }
    return res.json(await postService.updatePost(id, title, content, published))
  },
]

export const deletePost = [
  authorize,
  validatePostId,
  validate,
  async (req, res) => {
    const { id } = req.validated
    const post = await postService.getPost(id)
    if (!post || post.authorId !== req.user.id) {
      throw new AppError("Forbidden", 403)
    }
    await postService.deletePost(id)
    return res.status(204).send()
  },
]
