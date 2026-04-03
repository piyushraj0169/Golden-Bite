import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  razorpayPaymentId: { type: String },
  razorpayOrderId: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  paymentMethod: { type: String },
}, { timestamps: true });

export default mongoose.model("Payment", PaymentSchema);
