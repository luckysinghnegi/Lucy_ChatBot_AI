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

// --- Middleware ---
app.use(morgan("dev"));
app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options(/^(.*)$/, cors());
app.use(clerkMiddleware());

// --- Routes ---
app.get("/", (req, res) => res.send("Hello world!"));
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

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

app.use("/api/upload", uploadRouter);
app.use("/api/ai", aiRoutes);
app.use("/api/user", userSaveRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

// --- Server & DB Connection ---
// In Vercel, we just want to ensure DB is connected
connectDB();

// Only start the listener if we ARE NOT on Vercel/Production
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`✅ Local Server running on port ${PORT}`);
        console.log(`✅ Clerk is configured: ${process.env.CLERK_SECRET_KEY ? 'Yes' : 'No'}`);
    });
}

// CRITICAL for Vercel
export default app;