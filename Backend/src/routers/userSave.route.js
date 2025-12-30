import express from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { saveUser } from "../controllers/user.controller.js";

const router = express.Router();


router.post("/save", async (req, res) => {
  try {
    const clerkUserId = req.auth.userId; // ✅ from Clerk middleware

    const clerkUser = await clerkClient.users.getUser(clerkUserId);
    const user = await saveUser(clerkUser);

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "User save failed" });
  }
});

export default router;
