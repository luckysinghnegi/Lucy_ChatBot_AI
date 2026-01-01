import express from "express";
import { clerkClient } from "@clerk/express";
import { saveUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    // Route /user/save hit

    const authInfo = await req.auth();
    console.log("Auth info:", authInfo);

    if (!authInfo || !authInfo.userId) {
      // Unauthorized: no valid session
      return res.status(401).json({ message: "Unauthorized: no valid session" });
    }

    // Fetching user from Clerk...
    const clerkUser = await clerkClient.users.getUser(authInfo.userId);
    // Clerk user data: {clerkUser}

    // Saving user to DB...
    const user = await saveUser(clerkUser);

    // User saved successfully:", user

    res.json({ success: true, user });
  } catch (err) {
    console.error("Error in /user/save:", err);
    res.status(500).json({ message: "User save failed", error: err.message });
  }
});

export default router;
