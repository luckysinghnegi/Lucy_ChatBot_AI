import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";

export const getChatMessages = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { chatId } = req.params;

        const chat = await Chat.findOne({ _id: chatId, userId });
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }

        const messages = await Message.find({ chatId })
            .sort({ createdAt: 1 });
        
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
