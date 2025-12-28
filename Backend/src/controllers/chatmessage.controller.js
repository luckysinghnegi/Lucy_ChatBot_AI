import { askGroqAI } from "../utils/groq.js";
import { getGeminiReply } from "../utils/gemini.js"

import  Chat  from "../models/chat.model.js"

export const sendMessage = async (req, res) => {
  try {
    const { prompt } = req.body || {};      // fallback if body is undefined

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const answer = await askGroqAI(prompt);

    if (!answer) {
      return res.status(201).json({ answer, prompt })
    }

    const userId = req.auth.userId; // ✅ THIS IS IT

    console.log("Clerk User ID:", userId);


    let chat = await Chat.findOne({ userId })

    if (!chat) {
      chat = new Chat({
        userId,
        chat: []
      })
    }

    chat.Chats.push(
      {
        message: prompt,
        author: "USER"
      }
    )

    chat.chats.push({
      message: answer,
      author: "AI"
    });

    await chat.save()

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Groq Error:", error);
    return res.status(500).json({ error: error.message });
  }
};
