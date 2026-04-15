import { Router } from "express"
import {
  createPost,
  deletePost,
  getMyPosts,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/posts.controller.js"

const router = Router()

router.get("/", getPosts)
router.post("/", createPost)
router.get("/my", getMyPosts)
router.get("/:id", getPost)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)

export default router
