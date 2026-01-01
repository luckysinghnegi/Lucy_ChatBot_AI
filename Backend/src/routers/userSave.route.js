import express from "express";
import { clerkClient } from "@clerk/express"; // import clerk client
import { saveUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    // Get auth info from Clerk middleware
    const authInfo = await req.auth(); // ✅ use as function

    if (!authInfo || !authInfo.userId) {
      return res.status(401).json({ message: "Unauthorized: no valid session" });
    }

    const clerkUserId = authInfo.userId;
    console.log("AUTH OBJECT:", authInfo);

    // Fetch full user data from Clerk
    const clerkUser = await clerkClient.users.getUser(clerkUserId);

    // Save user in your DB
    const user = await saveUser(clerkUser);

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "User save failed", error: err.message });
  }
});

export default router;
