import User from "../models/user.model.js"; // your Mongoose user model

export const saveUser = async (clerkUser) => {
  const { email_addresses, first_name, last_name, id: clerkId } = clerkUser;

  // pick primary email
  const email = email_addresses?.[0]?.email_address;

  if (!email) throw new Error("No email found for user");

  // Find user by email and update if exists, otherwise create
  const user = await User.findOneAndUpdate(
    { email },       // filter by unique field
    {
      clerkId,
      first_name,
      last_name,
      email,
    },
    { new: true, upsert: true } // create if not exists
  );

  return user;
};
