import PDFDocument from "pdfkit";
import fs from "fs";

export const generatePDF = (booking) => {
  const path = `tickets/${booking.pnr}.pdf`;
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(path));
  doc.text(`Passenger: ${booking.passengerName}`);
  doc.text(`Flight: ${booking.flightId}`);
  doc.text(`Route: ${booking.route}`);
  doc.text(`Amount Paid: ₹${booking.amountPaid}`);
  doc.text(`PNR: ${booking.pnr}`);
  doc.text(`Date: ${booking.bookedAt}`);
  doc.end();

  return path;
};
