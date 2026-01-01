import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { clerkMiddleware, requireAuth } from "@clerk/express";



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
const allowedOrigins = [
    process.env.CLIENT_URL,
    "https://genuine-surprise-production.up.railway.app"
];

console.log(" _____ ")

app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin like Postman or CURL
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS not allowed for origin: ${origin}`));
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// --- Clerk Middleware ---
app.use(clerkMiddleware());

// --- Routes ---
app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Auth check route — will safely respond even if user is signed out
app.get("/auth-check", async (req, res) => {
    try {
        const authInfo = await req.auth(); // note the parentheses
        res.json({
            auth: !!authInfo,               // true if logged in
            user: authInfo?.userId || null,
            session: authInfo?.sessionId || null
        });
        console.log("Auth info:", authInfo);
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

// Connect to DB & start server
connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
});
