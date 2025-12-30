import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import toast, { Toaster } from 'react-hot-toast';
import Swal from "sweetalert2"
import "./ChatList.css";

export default function ChatList() {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
    const { getToken, isSignedIn } = useAuth();
    const { chatId: currentChatId } = useParams();
    useEffect(() => {
        if (!isSignedIn) return;

        const fetchChats = async () => {
            try {
                const token = await getToken();

                const res = await fetch("http://localhost:3000/api/chats", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setChats(data);
            } catch (err) {
                console.error("Failed to load chats", err);
            }
        };

        fetchChats();
    }, [isSignedIn]);
    console.log(chats)

    // Create new chat
    const createNewChat = async () => {
        try {
            const token = await getToken();

            const res = await fetch("http://localhost:3000/api/chats", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const chat = await res.json();
            setChats((prev) => [chat, ...prev]);
            toast.success("Chat created Successfuly!")
            navigate(`/dashboard/chat/${chat._id}`);
        } catch (err) {
            console.error("Failed to create chat", err);
        }
    };

    // delete chats 
    const handleDeleteChat = async (chatId) => {
        try {
            const result = await Swal.fire({
                title: "Delete this chat?",
                text: "This action cannot be undone.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete",
                cancelButtonText: "Cancel",
                background: "#12101b",
                color: "#ffffff",
                cancelButtonColor: "#2c2937",
                confirmButtonColor: "#e55571",
                reverseButtons: true,
            });


            if (!result.isConfirmed) return;

            const token = await getToken();

            const res = await fetch(`http://localhost:3000/api/chats/${chatId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            console.log(data, res.ok)
            if (res.ok) {
                // Remove chat from local state
                setChats((prev) => prev.filter((c) => c._id !== chatId));

                // If current chat is deleted, redirect
                if (currentChatId === chatId) {
                    navigate("/dashboard"); // or create new chat
                }
                toast.success("Chat deleted successfully")

            } else {
                Toaster.error(data.error || "Failed to delete chat");
            }
        } catch (error) {
            console.error("Error deleting chat:", error);
            toast.error("Something went wrong while deleting the chat");
        }
    };

    return (
        <div className="chatList">
            <div className="header">
                <h3>Dashboard</h3>
            </div>

            <div className="nav-links">
                <button className="nav-link" onClick={createNewChat}>
                    <span className="icon">💬</span>
                    <span>Create a New Chat</span>
                </button>

                <Link to="/" className="nav-link">
                    <span className="icon">🔍</span>
                    <span>Explore Lucy AI</span>
                </Link>

                <Link to="/" className="nav-link">
                    <span className="icon">📧</span>
                    <span>Contact</span>
                </Link>
            </div>

            <hr />

            <div className="section-header">
                <h4>Recent Chats</h4>
            </div>

            <div className="chatList-container">
                <ul className="chatList-items">
                    {chats.length === 0 && <button onClick={createNewChat}>New Chat</button>}
                    {chats.map((chat) => (
                        <li
                            key={chat._id}
                            onClick={() => navigate(`/dashboard/chat/${chat._id}`)}
                        >
                            <div className="chatBox">
                                <button onClick={() => navigate(`/dashboard/chat/${chat._id}`)}>
                                    {chat.title}
                                </button>
                                <span
                                    className="delete-icon"
                                    onClick={(e) => {
                                        e.stopPropagation(); // prevent parent click (navigate)
                                        handleDeleteChat(chat._id);
                                    }}
                                >
                                    🗑
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <hr />

            <div className="upgrade">
                <div className="upgrade-left">
                    <img src="/logo.png" alt="Lucy AI logo" />
                    <div className="upgrade-text">
                        <span>Upgrade to Lucy AI Pro</span>
                        <small>Unlimited access</small>
                    </div>
                </div>

                <button className="upgrade-btn">Upgrade</button>
            </div>

        </div>
    );
}
