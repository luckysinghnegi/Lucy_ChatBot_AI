import express from "express";
import {
  createChat,
  getMyChats,
  getChatById,
} from "../controllers/chat.controller.js";
import deleteChat from "../controllers/deleteChat.controller.js"

// Clerk Middleware
import requireAuth from "../middlewares/clerk.middleware.js"

const router = express.Router();

router.post("/", createChat);
router.get("/", getMyChats);
router.get("/:chatId", getChatById);
router.delete("/:chatId", requireAuth, deleteChat)
export default router;
