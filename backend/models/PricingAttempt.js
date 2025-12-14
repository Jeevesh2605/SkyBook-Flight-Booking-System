import mongoose from "mongoose";

const PricingAttemptSchema = new mongoose.Schema({
  flightId: String,
  attempts: Number,
  firstAttemptAt: Date
});

export default mongoose.model("PricingAttempt", PricingAttemptSchema);
