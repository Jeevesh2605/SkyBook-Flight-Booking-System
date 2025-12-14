import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";
import Wallet from "../models/Wallet.js";

const router = express.Router();

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { flightId, passengers, totalPrice } = req.body;

    if (!flightId || !passengers || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    if (flight.availableSeats < passengers.length) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const wallet = await Wallet.findOne({ userId: req.userId });
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    if (wallet.balance < totalPrice) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    wallet.balance -= totalPrice;
    await wallet.save();

    flight.availableSeats -= passengers.length;
    await flight.save();

    const booking = await Booking.create({
      userId: req.userId,
      flightId: flight._id,
      passengers,
      totalPrice,
      status: "confirmed",
    });

    const populatedBooking = await Booking.findById(booking._id).populate("flightId");

    return res.status(201).json({ 
      message: "Booking successful",
      booking: populatedBooking 
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    return res.status(500).json({ message: "Booking failed" });
  }
});

router.get("/my-bookings", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .populate("flightId")
      .sort({ createdAt: -1 });

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Get bookings error:", error);
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.userId,
    }).populate("flightId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ booking });
  } catch (error) {
    console.error("Get booking error:", error);
    return res.status(500).json({ message: "Failed to get booking" });
  }
});

export default router;