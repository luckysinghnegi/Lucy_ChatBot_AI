import React, { useEffect, useRef, useState } from "react";
import "./NewPrompt.css";

import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function NewPrompt() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesContainerRef = useRef(null);

    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    });

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        const scrollToBottom = () => {
            if (messagesContainerRef?.current) {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }
        };
        
        if (answer || loading || question || img.isLoading) {
            setTimeout(scrollToBottom, 100);
        }
    }, [answer, loading, question, img.isLoading]);

    // Scroll to bottom on mount
    useEffect(() => {
        setTimeout(() => {
            if (messagesContainerRef?.current) {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }
        }, 100);
    }, []);

    const sendMessage = async (text) => {
        setQuestion(text);
        setAnswer("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/ai/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: text,
                    imageUrl: img.dbData?.url || null,
                }),
            });

            const data = await res.json();
            setAnswer(data.answer || "No response received");
        } catch (error) {
            console.error("Failed to fetch response", error);
            setAnswer("Error: Failed to get AI response. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleForm = (e) => {
        e.preventDefault();

        const text = e.target.text.value;
        if (!text) return;

        sendMessage(text);
        e.target.text.value = "";

        setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
        });
    };

    return (
        <div className="newPromptWrapper">
            <div className="messagesContainer" ref={messagesContainerRef}>
                {img.isLoading && (
                    <div className="message loading">
                        <div className="loading-spinner"></div>
                        <span>Uploading image...</span>
                    </div>
                )}

                {img.dbData?.filePath && (
                    <IKImage
                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                        path={img.dbData.filePath}
                        transformation={[{ width: 380, height: 300 }]}
                    />
                )}

                {question && <div className="message user">{question}</div>}

                {loading && question && (
                    <div className="message loading">
                        <div className="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span className="loading-text">AI is thinking...</span>
                    </div>
                )}

                {answer && (
                    <div className="message">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {answer}
                        </ReactMarkdown>
                    </div>
                )}
            </div>

            <div className="endChat">
                <div className="newForm">
                    <form className="newForm" onSubmit={handleForm}>
                        <Upload setImg={setImg} />

                        <input
                            type="file"
                            multiple={false}
                            id="file"
                            hidden
                        />

                        <input
                            type="text"
                            name="text"
                            placeholder="Ask anything..."
                        />

                        <button type="submit">
                            <img src="/arrow.png" alt="Send" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewPrompt;
