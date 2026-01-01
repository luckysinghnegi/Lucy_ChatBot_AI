import express from "express";
import { sendMessage } from "../controllers/chatmessage.controller.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import requireAuth from "../middlewares/clerk.middleware.js"; // Clerk middleware

const router = express.Router();
router.use(ClerkExpressRequireAuth());

// send a message
router.post("/ask", requireAuth, sendMessage);

export default router;
