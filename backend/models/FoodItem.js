import mongoose from "mongoose";

const FoodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  price: Number,
  image: String,
  isAvailable: { type: Boolean, default: true },
  discount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("FoodItem", FoodItemSchema);
