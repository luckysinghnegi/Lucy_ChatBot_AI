import express from "express";
import { sendMessage } from "../controllers/chatmessage.controller.js";
import clerkAuth from "../middlewares/clerk.middleware.js"; // Clerk middleware

const router = express.Router();

// send a message
router.post("/ask", sendMessage);

// get all chats for the logged-in user
// router.get("/chat", clerkAuth, getUserChats);

export default router;
