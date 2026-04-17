import { Router } from "express"
import {
  createPost,
  deletePost,
  getMyPosts,
  getPost,
  getPosts,
  updatePost,
  uploadImage,
} from "../controllers/post.controller.js"
import { validatePostId } from "../validators/post.validator.js"
import commentRouter from "./comment.router.js"

const router = Router()

router.get("/", getPosts)
router.post("/", createPost)
router.get("/my", getMyPosts)

router.use("/:postId", validatePostId)
router.get("/:postId", getPost)
router.put("/:postId", updatePost)
router.delete("/:postId", deletePost)
router.post("/upload", uploadImage)

router.use("/:postId/comments", commentRouter)
export default router
