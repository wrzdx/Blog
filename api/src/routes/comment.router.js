import { Router } from "express"
import {
  createComment,
  deleteComment,
  getPostComments,
} from "../controllers/comment.controller.js"

const router = Router()

router.get("/", getPostComments)
router.post("/", createComment)
router.delete("/:commentId", deleteComment)

export default router
