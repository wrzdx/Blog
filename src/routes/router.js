import { Router } from "express"
import { getPosts } from "../controllers/posts.controller.js"
import authRouter from "./auth.router.js"
import postsRouter from "./posts.router.js"

const router = Router()

router.use("/auth", authRouter)
router.use("/posts", postsRouter)

export default router
