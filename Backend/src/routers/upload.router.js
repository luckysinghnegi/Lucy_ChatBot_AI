import express from "express"
import { imagekitAuth } from "../controllers/uploadAuth.controller.js"
import requireAuth from "../middlewares/clerk.middleware.js"

const router = express.Router()

router.get("/auth", requireAuth, imagekitAuth);

export default router