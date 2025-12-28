import express from "express"
import cors from "cors"
import connectDB from "./db/db.js"   // adjust path as needed
import aiRoutes from "./routers/ai.route.js"
import dotenv from "dotenv"
import morgan from "morgan";
import ImageKit from "imagekit"
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";


dotenv.config();   // load .env variables early — important
const app = express();

app.use(morgan("dev"));

//cors set up to allow the frontend to interreact with backend
app.use(cors({
    origin: "http://localhost:5173",
}))

// connect to MongoDB

// other middlewares...
app.use(express.json())

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


app.use("/api/ai", aiRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        // console.log("google api key " , process.env.GEMINI_API_KEY)
    });
})
