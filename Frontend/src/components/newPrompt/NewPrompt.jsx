import React, { useEffect, useRef, useState } from "react";
import "./NewPrompt.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "@clerk/clerk-react";
import Upload from "../upload/Upload"
import { IKImage } from "imagekitio-react"


function NewPrompt({ chatId }) {
    // ✅ FIXED
    const { getToken, isSignedIn } = useAuth();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    });

    const messagesContainerRef = useRef(null);

    // 🔽 Scroll to bottom
    useEffect(() => {
        messagesContainerRef.current?.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, loading]);

    // 1️⃣ Load messages, fetch all previous specific chat message/----------
    useEffect(() => {
        if (!isSignedIn || !chatId) return;

        const loadMessages = async () => {
            const token = await getToken();

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/messages/${chatId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: 'include'
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

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
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
        if (!text.trim()) return;

        sendMessage(text);
        e.target.reset();
    };

    return (
        <div className="newPromptWrapper">
            <div className="messagesContainer" ref={messagesContainerRef}>
                {messages.length == 0 && <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    fontSize: "18px",
                    fontWeight: "600",
                }}>Loading....</div>}
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
                {img.dbData?.filePath && (
                    <IKImage
                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                        path={img.dbData?.filePath}
                        width="380"
                        transformation={[{ width: 380 }]}
                    />
                )}

                {loading && (
                    <div className="message loading">
                        <span>AI is thinking...</span>
                    </div>
                )}
            </div>

            <form className="newForm" onSubmit={handleForm}>
                <Upload setImg={setImg} />
                <input className="fileUploader" id="file" type="file" multiple={false} hidden />
                <input
                    type="text"
                    name="text"
                    placeholder="Ask anything..."
                    autoComplete="on"
                />
                <button type="submit">
                    <img src="/arrow.png" alt="Send" />
                </button>
            </form>
        </div>
    );
}

export default NewPrompt;
