import express from "express";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { saveUser } from "../controllers/user.controller.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

router.use(ClerkExpressRequireAuth());

router.post("/save", async (req, res) => {
  try {
    const clerkUserId = req.auth.userId; // ✅ from Clerk middleware
    console.log("AUTH OBJECT:", req.auth);
    const clerkUser = await clerkClient.users.getUser(clerkUserId);
    const user = await saveUser(clerkUser);

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "User save failed" });
  }
});

export default router;
