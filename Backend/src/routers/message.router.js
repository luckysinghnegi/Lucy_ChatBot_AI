import express from "express";
import { sendMessage } from "../controllers/chatmessage.controller.js";
import { getChatMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/:chatId", getChatMessages);

export default router;
