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
import {
  deleteFile,
  getFileUrl,
  uploadFile,
} from "../services/supabase.service.js"

export const createPost = [
  authorize,
  upload.single("file"),
  validateCreatePost,
  validate,
  async (req, res) => {
    let imagePath = null
    try {
      if (!req.user.isAuthor) {
        throw new AppError("Only authors can create posts", 403)
      }

      const { title, content, published } = req.validated
      if (req.file) {
        imagePath = await uploadFile(req.file)
      }

      const post = await postService.createPost(
        req.user.id,
        title,
        content,
        published,
        imagePath,
      )

      const imageUrl = imagePath ? await getFileUrl(imagePath) : null

      return res.status(201).json({ ...post, imageUrl })
    } catch (err) {
      if (imagePath) {
        await deleteFile(imagePath).catch(() => {})
      }
      throw new AppError(err.message || "Something went wrong", 500)
    }
  },
]

export const getPosts = [
  async (req, res) => {
    const postsData = await postService.getPosts({ published: true })

    const posts = await Promise.all(
      postsData.map(async (post) => {
        let imageUrl = null

        if (post.imagePath) {
          imageUrl = await getFileUrl(post.imagePath)
        }

        return {
          ...post,
          content: getPreview(post.content),
          imageUrl,
        }
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
    const postsData = await postService.getPosts({ authorId: req.user.id })
    const posts = await Promise.all(
      postsData.map(async (post) => {
        let imageUrl = null

        if (post.imagePath) {
          imageUrl = await getFileUrl(post.imagePath)
        }

        return {
          ...post,
          content: getPreview(post.content),
          imageUrl,
        }
      }),
    )
    return res.json(posts)
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
    const imageUrl = post.imagePath ? await getFileUrl(post.imagePath) : null
    return res.json({ ...post, imageUrl })
  },
]

export const updatePost = [
  authorize,
  upload.single("file"),
  validateUpdatePost,
  validate,
  async (req, res) => {
    let imagePath = null
    try {
      const { postId, title, content, published } = req.validated
      const post = await postService.getPost(postId)
      if (!post || post.authorId !== req.user.id) {
        throw new AppError("Forbidden", 403)
      }
      if (post.imagePath) {
        await deleteFile(post.imagePath)
      }
      if (req.file) {
        imagePath = await uploadFile(req.file)
      }
      const updatedPost = await postService.updatePost(postId, {
        title,
        content,
        published,
        imagePath,
      })

      const imageUrl = imagePath ? await getFileUrl(imagePath) : null
      return res.json({ ...updatedPost, imageUrl })
    } catch (err) {
      if (imagePath) {
        await deleteFile(imagePath).catch(() => {})
      }
      throw new AppError(err.message || "Something went wrong", 500)
    }
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
    if (deleted.imagePath) {
      await deleteFile(deleteFile.imagePath)
    }
    return res.status(204).send()
  },
]
