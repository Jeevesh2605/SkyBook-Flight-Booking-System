import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  passengerName: String,
  flightId: String,
  airline: String,
  route: String,
  amountPaid: Number,
  pnr: String,
  bookedAt: Date,
  pdfPath: String
});

export default mongoose.model("Booking", BookingSchema);
