import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./db/db.js";
import aiRoutes from "./routers/ai.route.js";
import userSaveRoutes from "./routers/userSave.route.js";
import chatRoutes from "./routers/chat.router.js";
import messageRoutes from "./routers/message.router.js";
import uploadRouter from "./routers/upload.router.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());

// --- CORS Setup ---
// Update your CORS configuration to be more flexible
const allowedOrigins = [
    process.env.CLIENT_URL,
    'https://lucy-chat-bot-ai.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:8080',
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, Postman)
        if (!origin) return callback(null, true);

        // Check if origin is in allowed list
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Allow subdomains of your vercel app
        if (origin.includes('.vercel.app') || origin.includes('.localhost')) {
            return callback(null, true);
        }

        console.error("Blocked by CORS:", origin);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Clerk-Auth"],
};

// --- Clerk Middleware ---
app.use(clerkMiddleware());

// --- Routes ---
app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Auth check route
app.get("/auth-check", async (req, res) => {
    try {
        const authInfo = await req.auth();
        res.json({
            auth: !!authInfo,
            user: authInfo?.userId || null,
            session: authInfo?.sessionId || null
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to read auth info" });
    }
});

// Routers
app.use("/api/upload", uploadRouter);
app.use("/api/ai", aiRoutes);
app.use("/api/user", userSaveRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    // Handle CORS errors
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ error: "CORS policy blocked this request" });
    }

    res.status(500).json({ error: "Something went wrong!" });
});

// Connect to DB & start server
connectDB().then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`✅ Server running on port ${port}`);
        console.log(`✅ Allowed origins: ${allowedOrigins.join(', ')}`);
        console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`✅ Clerk is configured: ${process.env.CLERK_SECRET_KEY ? 'Yes' : 'No'}`);
    });
});