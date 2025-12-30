import React, { useEffect, useRef, useState } from "react";
import "./NewPrompt.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "@clerk/clerk-react";


function NewPrompt({ chatId }) {
    // ✅ FIXED
    const { getToken, isSignedIn } = useAuth();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const messagesContainerRef = useRef(null);

    // 🔽 Scroll to bottom
    useEffect(() => {
        messagesContainerRef.current?.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, loading]);

    // 1️⃣ Load messages, fetch the all previous specific chat message/----------
    useEffect(() => {
        if (!isSignedIn || !chatId) return;

        const loadMessages = async () => {
            const token = await getToken();

            const res = await fetch(
                `http://localhost:3000/api/messages/${chatId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            setMessages(data);
        };

        loadMessages();
    }, [chatId, isSignedIn]);

    // 2️⃣ Send message and clerk token for verfication to AI and recieve reply/------
    const sendMessage = async (text) => {
        setLoading(true);

        const token = await getToken();

        const res = await fetch("http://localhost:3000/api/messages/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                chatId,
                prompt: text, // User Prompt sended to backend/------------
            }),
        });

        const data = await res.json();

        setMessages((prev) => [
            ...prev,
            { role: "user", content: text },
            { role: "assistant", content: data.reply },
        ]);

        setLoading(false);
    };


    // 3️⃣ Form submit
    const handleForm = (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        if (!text) return;

        sendMessage(text);
        e.target.reset();
    };

    return (
        <div className="newPromptWrapper">
            <div className="messagesContainer" ref={messagesContainerRef}>
                {Array.isArray(messages) && messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`message ${msg.role === "user" ? "user" : ""}`}
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                        </ReactMarkdown>
                    </div>
                ))}

                {loading && (
                    <div className="message loading">
                        <span>AI is thinking...</span>
                    </div>
                )}
            </div>

            <form className="newForm" onSubmit={handleForm}>
                <input
                    type="text"
                    name="text"
                    placeholder="Ask anything..."
                    autoComplete="off"
                />
                <button type="submit">
                    <img src="/arrow.png" alt="Send" />
                </button>
            </form>
        </div>
    );
}

export default NewPrompt;
