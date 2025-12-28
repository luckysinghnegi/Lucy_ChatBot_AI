import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // from Clerk
  name: String,
}, { timestamps: true });

export default mongoose.model("User", userSchema);
