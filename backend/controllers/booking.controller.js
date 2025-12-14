import Flight from "../models/Flight.js";
import Wallet from "../models/Wallet.js";
import Booking from "../models/Booking.js";
import { applySurgePricing } from "../services/pricingEngine.js";
import { generatePDF } from "../services/pdfService.js";

export const bookFlight = async (req, res) => {
  const { passengerName, flightId } = req.body;

  const flight = await Flight.findOne({ flightId });
  await applySurgePricing(flight);

  const wallet = await Wallet.findOne({ userId: req.userId });
  if (wallet.balance < flight.currentPrice)
    return res.status(400).json({ message: "Insufficient balance" });

  wallet.balance -= flight.currentPrice;
  await wallet.save();

  const booking = await Booking.create({
    userId: req.userId,
    passengerName,
    flightId,
    airline: flight.airline,
    route: `${flight.departureCity} → ${flight.arrivalCity}`,
    amountPaid: flight.currentPrice,
    pnr: "PNR" + Date.now(),
    bookedAt: new Date()
  });

  booking.pdfPath = generatePDF(booking);
  await booking.save();

  res.json(booking);
};

export const getBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.userId });
  res.json(bookings);
};
