import { authorize, authorizeOptional } from "../middleware/auth.js"
import * as postService from "../services/post.service.js"
import { AppError } from "../utils/error.js"
import {
  validateCreatePost,
  validateUpdatePost,
} from "../validators/post.validator.js"
import { validate } from "../middleware/validate.js"
import { upload } from "../middleware/upload.js"
import { getPreview } from "../utils/getContentPreview.js"

export const createPost = [
  authorize,
  upload.single("file"),
  validateCreatePost,
  validate,
  async (req, res) => {
    try {
      if (!req.user.isAuthor) {
        throw new AppError("Only authors can create posts", 403)
      }

      const { title, content, published } = req.validated
      const imageUrl = req.file
        ? `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`
        : null

      const post = await postService.createPost(
        req.user.id,
        title,
        content,
        published,
        imageUrl,
      )

      return res.status(201).json(post)
    } catch (err) {
      if (req.file?.path) {
        fs.unlink(req.file.path, () => {})
      }
      throw new AppError(err.message || "Something went wrong", 500)
    }
  },
]

export const getPosts = [
  async (req, res) => {
    const posts = (await postService.getPosts({ published: true })).map(
      (post) => ({
        ...post,
        content: getPreview(post.content),
      }),
    )
    return res.json(posts)
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
    const { postId, title, content, published, imageUrl } = req.validated
    const post = await postService.getPost(postId)
    if (!post || post.authorId !== req.user.id) {
      throw new AppError("Forbidden", 403)
    }
    return res.json(
      await postService.updatePost(postId, title, content, published, imageUrl),
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
    const filename = deleted.imageUrl.split("/").pop()

    fs.unlink(`uploads/${filename}`, () => {})
    return res.status(204).send()
  },
]
