import React from "react";
import { useNavigate } from "react-router-dom";

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateDuration = (departure, arrival) => {
    const diff = new Date(arrival) - new Date(departure);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleBookNow = () => {
    navigate("/booking", { state: { flight } });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {flight.airline || "Airline"}
              </h3>
              <p className="text-sm text-gray-500">
                {flight.flightNumber || "Flight Number"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              ₹{flight.price?.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">per person</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="text-3xl font-bold text-gray-900">
              {formatTime(flight.departureTime)}
            </p>
            <p className="text-sm text-gray-600 mt-1">{flight.from}</p>
            <p className="text-xs text-gray-400">
              {formatDate(flight.departureTime)}
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center px-4">
            <p className="text-xs text-gray-500 mb-1">
              {calculateDuration(flight.departureTime, flight.arrivalTime)}
            </p>
            <div className="w-full relative">
              <div className="h-px bg-gray-300 w-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop(s)`}
            </p>
          </div>

          <div className="flex-1 text-right">
            <p className="text-3xl font-bold text-gray-900">
              {formatTime(flight.arrivalTime)}
            </p>
            <p className="text-sm text-gray-600 mt-1">{flight.to}</p>
            <p className="text-xs text-gray-400">
              {formatDate(flight.arrivalTime)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4"
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
              <span>{flight.availableSeats} seats left</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{flight.class || "Economy"}</span>
            </div>
          </div>
          <button
            onClick={handleBookNow}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;