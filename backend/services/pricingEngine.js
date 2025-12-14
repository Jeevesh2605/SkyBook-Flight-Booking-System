import PricingAttempt from "../models/PricingAttempt.js";

export const applySurgePricing = async (flight) => {
  const now = new Date();
  let record = await PricingAttempt.findOne({ flightId: flight.flightId });

  if (!record) {
    await PricingAttempt.create({
      flightId: flight.flightId,
      attempts: 1,
      firstAttemptAt: now
    });
    return;
  }

  const minutes = (now - record.firstAttemptAt) / 60000;

  if (minutes <= 5) {
    record.attempts += 1;
    if (record.attempts >= 3) {
      flight.currentPrice = Math.round(flight.basePrice * 1.1);
      await flight.save();
    }
  }

  if (minutes > 10) {
    record.attempts = 1;
    record.firstAttemptAt = now;
    flight.currentPrice = flight.basePrice;
    await flight.save();
  }

  await record.save();
};
