import React from 'react'
import { Link } from 'react-router-dom'
import "./ChatList.css"

export default function ChatList() {
    return (
        <div className='chatList'>
            <div className="header">
                <h3>Dashboard</h3>
            </div>
            
            <div className="nav-links">
                <Link to={"/dashboard"} className="nav-link">
                    <span className="icon">💬</span>
                    <span>Create a New Chat</span>
                </Link>
                <Link to={"/"} className="nav-link">
                    <span className="icon">🔍</span>
                    <span>Explore Lucy AI</span>
                </Link>
                <Link to={"/"} className="nav-link">
                    <span className="icon">📧</span>
                    <span>Contact</span>
                </Link>
            </div>

            <hr />

            <div className="section-header">
                <h4>Recent Chats</h4>
            </div>
            
            <div className="list">
                <Link className="chat-item">New Chat 1</Link>
                <Link className="chat-item">New Chat 2</Link>
                <Link className="chat-item">New Chat 3</Link>
                <Link className="chat-item">New Chat 4</Link>
                <Link className="chat-item">New Chat 5</Link>
            </div>

            <hr />

            <div className="upgrade">
                <div className="upgrade-icon">
                    <img src="/logo.png" alt="Logo" />
                </div>
                <div className="upgrade-texts">
                    <span className="upgrade-title">Upgrade to Lucy AI Pro</span>
                    <span className="upgrade-subtitle">Get unlimited access to all features</span>
                </div>
            </div>
        </div>
    )
}
