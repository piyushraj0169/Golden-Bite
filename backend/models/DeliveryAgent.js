import mongoose from "mongoose";

const DeliveryAgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  vehicleNumber: String,
  status: { type: String, enum: ['Available', 'Busy', 'Offline'], default: 'Available' }
}, { timestamps: true });

export default mongoose.model("DeliveryAgent", DeliveryAgentSchema);
