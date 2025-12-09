
import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  reference: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["success", "failed", "pending"], required: true },
  currency: { type: String, default: "GHS" },
  paymentMethod: { type: String }, // e.g. "card", "bank"
  cardLast4: { type: String }, // last 4 digits only
  name: { type: String },
  email: { type: String },
  message: { type: String },
}, 
{ timestamps: true });


export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
