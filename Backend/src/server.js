import express from "express"
import cors from "cors"

// MongoDB database imported here /--------------
import connectDB from "./db/db.js"   // adjust path as needed

// All routes import here/-----------
import aiRoutes from "./routers/ai.route.js"
import userSaveRoutes from "./routers/userSave.route.js"
import chatRoutes from "./routers/chat.router.js"
import messageRoutes from "./routers/message.router.js"

// dotenv , imageKit ,and clerk external libraries imported here/-------------
import dotenv from "dotenv"
import morgan from "morgan";
import ImageKit from "imagekit"
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

dotenv.config();   // load .env variables early — important

const app = express();

app.use(morgan("dev"));

//cors set up to allow the frontend to interreact with backend/---------------------
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


// other middlewares...
app.use(express.json())

// giving access to Clerk in all endpoints to get clerk userId/-----------
app.use("/api", ClerkExpressRequireAuth())

// define routes, etc.

const PORT = process.env.PORT || 3000;

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
})


app.get("/", (req, res) => {
    res.send("Hello world!")
})

// AI reply router
app.use("/api/ai", aiRoutes);

// saving user route
app.use("/api/user", userSaveRoutes)

// controlling chats and each message and giving the chat list to user
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
