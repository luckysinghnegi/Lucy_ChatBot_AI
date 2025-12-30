🤖 Lucy — AI Chat Application

Lucy is a modern AI-powered chat application built using the MERN stack, designed to deliver smooth, real-time conversations with secure authentication and a clean user experience.
The project focuses on scalability, usability, and production-level architecture, making it suitable for real-world use.

This application allows users to create multiple chats, interact with an AI assistant, manage chat history, and enjoy a responsive, intuitive interface.

🚀 Key Features

🔐 Secure Authentication using Clerk

💬 AI-powered Conversations with persistent chat history

➕ Create Multiple Chats and switch between them easily

🗑 Delete Chats with user confirmation

🔔 Toast Notifications for better user feedback

⚡ Real-time UI Updates without page reload

📜 Markdown Support for rich AI responses

📱 Responsive Design for desktop and mobile

🛠 Tech Stack

Frontend

⚛️ React (Vite)

🎨 CSS (Custom Styling)

📄 React Markdown

🔔 React Hot Toast

Backend

🟢 Node.js

🚂 Express.js

🍃 MongoDB (Mongoose)

Authentication

🔐 Clerk Authentication

AI Integration

🤖 AI API (LLM-based responses)

Other Tools

📦 ImageKit (File upload support)

🔑 JWT via Clerk tokens

🧩 Project Structure
Lucy-AI-Chat/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── main.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/lucy-ai-chat.git
cd lucy-ai-chat

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Create a .env file and add:

MONGO_URI=your_mongodb_url
CLERK_SECRET_KEY=your_clerk_secret

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Add your Clerk publishable key in the frontend config.

🧠 How It Works

User logs in securely using Clerk

A new chat can be created from the dashboard

Messages are sent to the backend along with authentication tokens

AI processes the prompt and returns a response

Chat history is stored and fetched per chat

UI updates instantly without refreshing the page

🎯 Why This Project Matters

This project demonstrates:

Real-world full-stack development

Secure authentication & authorization

Clean React state management

REST API design

AI integration

User-focused UI/UX thinking

It is suitable for:

Full Stack Developer portfolios

MSc Computer Science (Conversion) applications

Startup or internship evaluations

🔮 Future Improvements

🌐 Streaming AI responses

📎 File upload inside chat

🌙 Dark / Light mode

🔍 Search within chats

🧠 Chat title auto-generation

📊 Usage analytics

⭐ Support

If you find this project useful or inspiring, please consider giving it a ⭐ on GitHub.
It helps showcase the project and motivates further improvements.

👨‍💻 Author

Lucky Singh
Full Stack Developer
Built with passion for learning and real-world problem solving.
