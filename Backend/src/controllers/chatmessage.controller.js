import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
// import askAI from "../utils/groq.js.js"


export const sendMessage = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { chatId, prompt } = req.body;
  
    if (!chatId || !prompt) {
      return res.status(400).json({ error: "chatId and prompt required" });
    }

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    // USER message
    await Message.create({
      chatId,
      role: "user",
      content: prompt,
    });

    // AI reply
    const aiReply = "working";

    // AI message
    await Message.create({
      chatId,
      role: "assistant",
      content: aiReply,
    });

    chat.lastMessage = aiReply;
    await chat.save();

    // ✅ SIMPLE RESPONSE
    res.json({ reply: aiReply });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
