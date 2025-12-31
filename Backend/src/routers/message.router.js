import express from "express";
import { sendMessage } from "../controllers/chatmessage.controller.js";
import { getChatMessages } from "../controllers/message.controller.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";


const router = express.Router();
router.use(ClerkExpressRequireAuth());

router.post("/send", sendMessage);
router.get("/:chatId", getChatMessages);

export default router;
