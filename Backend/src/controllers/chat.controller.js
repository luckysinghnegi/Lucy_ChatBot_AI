import Chat from "../models/chat.model.js";

/**
 * Create new chat
 */
export const createChat = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { prompt } = req.body || {};

    const chatData = { userId };

    // New-prompt flow
    if (prompt && prompt.trim()) {
      chatData.firstMessage = prompt;
      chatData.lastMessage = prompt;
      chatData.title = prompt.slice(0, 40);
    }

    // Create-chat button → empty chat (valid)

    const chat = await Chat.create(chatData);
    res.status(201).json(chat);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create chat" });
  }
};


/**
 * Get all chats of logged-in user
 */
export const getMyChats = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const chats = await Chat.find({ userId })
      .sort({ updatedAt: -1 })
      .select("_id title lastMessage updatedAt");

    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get single chat (ownership check)
 */
export const getChatById = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { chatId } = req.params;

    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
