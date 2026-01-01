import React, { useState } from "react";
import "./DashboardPage.css";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const createChat = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    try {
      const token = await getToken();

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const chat = await res.json();
      console.log(chat)
      navigate(`/dashboard/chat/${chat._id}`, {
        state: { firstPrompt: prompt },
      });

    } catch (error) {
      console.error("Failed to create chat", error);
    }
  };

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>LAMA AI</h1>
        </div>

        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>

      <div className="formContainer">
        <form onSubmit={createChat}>
          <input
            type="text"
            placeholder="Ask me anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit">
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
