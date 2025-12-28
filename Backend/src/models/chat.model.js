import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    author: {
        type: String,
        enum: ["USER", "AI"],
        required: true
    }
}, { _id: false });


const chatSchema = new mongoose.Schema(
    {
        userId: {
            type: String, // Clerk userId
            required: true
        },
        chats: [chatMessageSchema] // ARRAY of messages
    },
    { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
