import { Schema, model, models } from "mongoose";

const UserShema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true },
  photo: { type: String, required: true, unique: true },
});

const User = models.User || model("User", UserShema);

export default User;
