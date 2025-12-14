import Flight from "../models/Flight.js";

export const getFlights = async (req, res) => {
  const { from, to } = req.query;

  const flights = await Flight.find({
    departureCity: from,
    arrivalCity: to
  }).limit(10);

  res.json(flights);
};
