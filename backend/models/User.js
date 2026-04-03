import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  address: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  zip: { type: String, default: "" },
  country: { type: String, default: "" },
  role: { type: String, enum: ['user', 'admin', 'delivery'], default: 'user' },
  isBlocked: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
