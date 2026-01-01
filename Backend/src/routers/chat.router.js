import express from "express";
import {
  createChat,
  getMyChats,
  getChatById,
} from "../controllers/chat.controller.js";
import deleteChat from "../controllers/deleteChat.controller.js"

// Clerk Middleware
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.use(requireAuth());

router.post("/", createChat);
router.get("/", getMyChats);
router.get("/:chatId", getChatById);
router.delete("/:chatId", deleteChat)
export default router;
