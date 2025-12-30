import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk user ID
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  // we can add more fields like role, profilePic, etc.
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
