import express from "express";
import Flight from "../models/Flight.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { from, to, date } = req.query;

    console.log("Search params:", { from, to, date });

    if (!from || !to || !date) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    // Create date range for the entire day in local time
    const searchDate = new Date(date + "T00:00:00");
    const nextDay = new Date(date + "T23:59:59");

    console.log("Searching for flights between:", searchDate, "and", nextDay);

    const flights = await Flight.find({
      from: { $regex: new RegExp(from, "i") },
      to: { $regex: new RegExp(to, "i") },
      departureTime: {
        $gte: searchDate,
        $lte: nextDay,
      },
    });

    console.log(`Found ${flights.length} flights`);
    if (flights.length > 0) {
      console.log("First flight departure:", flights[0].departureTime);
    }

    return res.status(200).json({ flights });
  } catch (error) {
    console.error("Flight search error:", error);
    return res.status(500).json({ message: "Failed to search flights" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    
    return res.status(200).json({ flight });
  } catch (error) {
    console.error("Get flight error:", error);
    return res.status(500).json({ message: "Failed to get flight" });
  }
});

export default router;