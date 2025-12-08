import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reference: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["success", "failed", "pending"], required: true },
  currency: { type: String, default: "GHS" },
  paymentMethod: { type: String }, // e.g. "card", "bank"
  cardLast4: { type: String }, // last 4 digits only
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
