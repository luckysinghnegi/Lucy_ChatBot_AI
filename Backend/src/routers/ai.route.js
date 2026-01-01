import express from "express";
import { sendMessage } from "../controllers/chatmessage.controller.js";

const router = express.Router();

// send a message
router.post("/ask", sendMessage);

export default router;
