import express from "express"
import { imagekitAuth } from "../controllers/uploadAuth.controller.js"

const router = express.Router()

router.get("/auth", imagekitAuth);

export default router