import { authorize, authorizeOptional } from "../middleware/auth.js"
import * as postService from "../services/post.service.js"
import { AppError } from "../utils/error.js"
import {
  validateCreatePost,
  validateUpdatePost,
} from "../validators/post.validator.js"
import { validate } from "../middleware/validate.js"
import { upload } from "../middleware/upload.js"
import sanitizeHtml from "sanitize-html"

export const createPost = [
  authorize,
  validateCreatePost,
  validate,
  async (req, res) => {
    if (!req.user.isAuthor) {
      throw new AppError("Only authors can create posts", 403)
    }
    const { title, content, published } = req.validated
    const cleanContent = sanitizeHtml(content, {
      allowedTags: ["p", "strong", "em", "img", "h1", "h2"],
      allowedAttributes: {
        img: ["src", "alt"],
      },
    })
    return res
      .status(201)
      .json(
        await postService.createPost(
          req.user.id,
          title,
          cleanContent,
          published,
        ),
      )
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
    if (!req.user.isAuthor) {
      throw new AppError("Only authors can have posts", 403)
    }
    return res.json(await postService.getPosts({ authorId: req.user.id }))
  },
]

export const getPost = [
  authorizeOptional,
  validate,
  async (req, res) => {
    const { postId } = req.validated
    const post = await postService.getPost(postId)
    if (!post) {
      throw new AppError("Post not found", 404)
    }
    if (!post.published && (!req.user || post.authorId !== req.user.id)) {
      throw new AppError("Forbidden", 403)
    }
    return res.json(post)
  },
]

export const updatePost = [
  authorize,
  validateUpdatePost,
  validate,
  async (req, res) => {
    const { postId, title, content, published } = req.validated
    const post = await postService.getPost(postId)
    if (!post || post.authorId !== req.user.id) {
      throw new AppError("Forbidden", 403)
    }
    return res.json(
      await postService.updatePost(postId, title, content, published),
    )
  },
]

export const deletePost = [
  authorize,
  validate,
  async (req, res) => {
    const { postId } = req.validated
    const post = await postService.getPost(postId)
    if (!post || post.authorId !== req.user.id) {
      throw new AppError("Forbidden", 403)
    }
    const deleted = await postService.deletePost(postId)
    const images = extractImages(deleted.content)
    deleteImages(images)
    return res.status(204).send()
  },
]

export const uploadImage = [
  upload.single("file"),
  async (req, res) => {
    res.json({
      url: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`,
    })
  },
]
