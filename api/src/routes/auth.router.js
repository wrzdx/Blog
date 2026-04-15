import { Router } from "express"
import { me, login, logout, register } from "../controllers/auth.controller.js"

const router = Router()
router.get("/me", me)
router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)

export default router
