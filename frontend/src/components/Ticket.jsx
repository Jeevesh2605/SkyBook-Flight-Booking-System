import React from "react";

const Ticket = ({ booking }) => {
  // Get flight data - handle both flightId and flight property
  const flight = booking.flightId || booking.flight;

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">E-Ticket</h2>
            <p className="text-blue-100">Booking ID: {booking._id}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-8 mb-6">
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">From</p>
            <p className="text-2xl font-bold text-gray-900">
              {flight?.from || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {formatDate(flight?.departureTime)}
            </p>
            <p className="text-xl font-semibold text-gray-900">
              {formatTime(flight?.departureTime)}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-full relative">
              <div className="absolute top-1/2 w-full h-px bg-gray-300"></div>
              <div className="relative flex justify-center">
                <div className="bg-white px-2">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {flight?.flightNumber || "N/A"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase mb-1">To</p>
            <p className="text-2xl font-bold text-gray-900">
              {flight?.to || "N/A"}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {formatDate(flight?.arrivalTime)}
            </p>
            <p className="text-xl font-semibold text-gray-900">
              {formatTime(flight?.arrivalTime)}
            </p>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-300 my-6"></div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Airline</p>
            <p className="text-lg font-semibold text-gray-900">
              {flight?.airline || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Class</p>
            <p className="text-lg font-semibold text-gray-900">
              {flight?.class || "Economy"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Status</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                booking.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || "Pending"}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">Total Paid</p>
            <p className="text-lg font-bold text-blue-600">
              ₹{booking.totalPrice?.toLocaleString() || "0"}
            </p>
          </div>
        </div>

        <div className="border-t border-dashed border-gray-300 my-6"></div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">
            Passengers
          </h3>
          <div className="space-y-3">
            {booking.passengers?.map((passenger, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {passenger.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {passenger.age} years • {passenger.gender}
                    </p>
                  </div>
                </div>
                {passenger.seatNumber && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Seat</p>
                    <p className="font-semibold text-gray-900">
                      {passenger.seatNumber}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Important:</strong> Please arrive at the airport at least 2
            hours before departure. Carry a valid photo ID for verification.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Booked on {formatDate(booking.createdAt)}
          </p>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;