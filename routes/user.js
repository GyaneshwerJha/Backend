import express from "express"
import { logout, register, login, getUserDetails } from "../controller/user.js"
import { isAuthenticated } from "../middlewares/authh.js"

const router = express.Router()

router.post("/new", register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/me", isAuthenticated, getUserDetails)

export default router