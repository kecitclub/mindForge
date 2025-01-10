import express from "express"
import { acceptRequest} from "../controllers/ambulance.controller.js"
import isAuthenticated from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/accept-request", isAuthenticated, acceptRequest)

export default router