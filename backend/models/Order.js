import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  order_id: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ['created', 'paid', 'pending', 'preparing', 'out_for_delivery', 'completed', 'cancelled'], default: "created" },
  payment_id: String,
  created_at: Number,
  customer: {
    firstName: String, lastName: String,
    phone: String, email: String,
    address: String, city: String,
    state: String, zip: String, country: String,
  },
  items: [{
    id: String, title: String,
    price: Number, qty: Number, image: String,
  }],
  deliveryAgentId: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryAgent" }
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
