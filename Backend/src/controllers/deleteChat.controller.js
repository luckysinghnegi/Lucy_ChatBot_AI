import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

const deleteChat = async (req, res) => {
  try {
    const userId = req.auth.userId;       // from Clerk auth middleware
    const { chatId } = req.params;        // chat id from URL
    
    // Find chat & verify ownership
    const chat = await Chat.findOne({ _id: chatId, userId });
    if (!chat) {
      return res.status(404).json({ error: "Chat not found or not yours",chat });
    }

    //  Delete all messages of this chat
    await Message.deleteMany({ chatId });

    //  Delete the chat itself
    await Chat.deleteOne({ _id: chatId });

    //  Send success response
    res.status(200).json({ message: "Chat deleted successfully", chatId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete chat" });
  }
};

export default deleteChat
