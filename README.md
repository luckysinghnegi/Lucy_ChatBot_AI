🚀 Lucy AI — Intelligent Chat Platform
<p align="center"> <img src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" width="120" alt="Lucy AI Logo" /> </p> <p align="center"> <strong>A production-style AI chat platform built with modern full-stack engineering.</strong> </p> <p align="center"> <i>Designed like a real SaaS product — not a demo, not a college project.</i> </p>
🛡 Tech Badges
<p align="center"> <img src="https://img.shields.io/badge/React-18-blue" /> <img src="https://img.shields.io/badge/Node.js-Express-green" /> <img src="https://img.shields.io/badge/MongoDB-Database-brightgreen" /> <img src="https://img.shields.io/badge/Auth-Clerk-purple" /> <img src="https://img.shields.io/badge/AI-LLM-orange" /> <img src="https://img.shields.io/badge/Status-Active-success" /> </p>
🧠 What is Lucy AI?

Lucy AI is a secure, scalable AI chat application where users can create and manage multiple AI-powered conversations.

The project focuses on real-world engineering practices:

Authentication-first architecture

Persistent chat history

Clean UI/UX

Modular backend

Product-grade code structure

This repository reflects how actual software products are built and maintained.

✨ Key Features

🔐 Secure authentication using Clerk

💬 AI-powered chat conversations

🗂 Multiple chat sessions per user

🗑 Delete chats with confirmation flow

📜 Persistent message history

✍️ Markdown-rendered AI responses

🔔 Toast notifications (UX focused)

📱 Responsive dashboard layout

🖥 Screenshots (Preview)

(Screenshots can be updated later — structure already professional)

<p align="center"> <img src="https://via.placeholder.com/800x450?text=Dashboard+UI" /> </p> <p align="center"> <img src="https://via.placeholder.com/800x450?text=Chat+Interface" /> </p>
🏗 System Architecture
Client (React + Vite)
   ↓
Authentication (Clerk JWT)
   ↓
API Layer (Node.js + Express)
   ↓
Database (MongoDB)
   ↓
AI Language Model

🧰 Tech Stack
Frontend

React (Vite)

JavaScript (ES6+)

CSS (Custom styling)

React Markdown

React Hot Toast

Backend

Node.js

Express.js

MongoDB (Mongoose)

Authentication

Clerk (JWT-based)

AI Integration

AI Language Model API

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/lucy-ai.git
cd lucy-ai

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Create .env:

MONGO_URI=your_mongodb_uri
CLERK_SECRET_KEY=your_clerk_secret

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Add Clerk publishable key in frontend config.

🔐 Environment Variables
Variable	Purpose
MONGO_URI	MongoDB connection
CLERK_SECRET_KEY	Clerk backend auth
VITE_CLERK_PUBLISHABLE_KEY	Clerk frontend auth
💡 Engineering Highlights

Clean REST API design

Optimistic UI updates

Secure token validation

Modular controller structure

Production-style folder architecture

User-focused UX decisions

🚧 Planned Improvements

Streaming AI responses

Image & file uploads

Chat search

Usage analytics

Dark mode

Team/shared chats

👨‍💻 Author

Lucky Singh
Full-Stack Developer
Focused on building scalable, real-world software products.

📄 License

MIT License — free to use and modify.

⭐ Why This Project Stands Out

Lucy AI demonstrates how real products are engineered, not just how features are coded.

It highlights:

Full-stack ownership

Secure auth handling

UX-driven decisions

Clean production mindset
