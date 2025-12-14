import mongoose from "mongoose";
import dotenv from "dotenv";
import Booking from "./models/Booking.js";

dotenv.config();

const clearBookings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const result = await Booking.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} old bookings`);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

clearBookings();