import { Router } from "express"
import { getPosts } from "../controllers/post.controller.js"
import authRouter from "./auth.router.js"
import postsRouter from "./post.router.js"

const router = Router()

router.use("/auth", authRouter)
router.use("/posts", postsRouter)

export default router
