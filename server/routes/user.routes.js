import express from "express"
import { register, login, logout, ambulanceRequest } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.post("/request-ambulances", isAuthenticated, ambulanceRequest)

router.get("/dashboard", isAuthenticated)

export default router
