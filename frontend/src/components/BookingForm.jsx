import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BACKENDURL } from "../Config/Config";
import { authContext } from "../context/authContext.jsx";
import { toast } from "react-toastify";

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state: authState } = useContext(authContext);
  const flight = location.state?.flight;

  const [passengers, setPassengers] = useState([
    {
      name: "",
      age: "",
      gender: "male",
      seatNumber: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Flight Selected</h2>
          <p className="text-gray-600 mb-4">Please select a flight first</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search Flights
          </button>
        </div>
      </div>
    );
  }

  const handleAddPassenger = () => {
    if (passengers.length < 5) {
      setPassengers([
        ...passengers,
        { name: "", age: "", gender: "male", seatNumber: "" },
      ]);
    }
  };

  const handleRemovePassenger = (index) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const calculateTotal = () => {
    return flight.price * passengers.length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name || !p.age || !p.gender) {
        toast.error(`Please fill all details for passenger ${i + 1}`);
        return;
      }
      if (p.age < 1 || p.age > 120) {
        toast.error(`Please enter valid age for passenger ${i + 1}`);
        return;
      }
    }

    setIsLoading(true);

    try {
      const token = authState?.token || localStorage.getItem("token");
      
      if (!token) {
        toast.error("Please login to book a flight");
        navigate("/login");
        return;
      }

      const response = await fetch(`${BACKENDURL}/api/bookings/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          flightId: flight._id,
          passengers: passengers,
          totalPrice: calculateTotal(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Booking successful!");
        navigate("/bookings");
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Search
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Passenger Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg space-y-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">
                        Passenger {index + 1}
                      </h3>
                      {passengers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemovePassenger(index)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={passenger.name}
                          onChange={(e) =>
                            handlePassengerChange(index, "name", e.target.value)
                          }
                          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Age
                        </label>
                        <input
                          type="number"
                          value={passenger.age}
                          onChange={(e) =>
                            handlePassengerChange(index, "age", e.target.value)
                          }
                          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="25"
                          min="1"
                          max="120"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <select
                          value={passenger.gender}
                          onChange={(e) =>
                            handlePassengerChange(index, "gender", e.target.value)
                          }
                          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          required
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Seat Number (Optional)
                        </label>
                        <input
                          type="text"
                          value={passenger.seatNumber}
                          onChange={(e) =>
                            handlePassengerChange(
                              index,
                              "seatNumber",
                              e.target.value
                            )
                          }
                          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="12A"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {passengers.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddPassenger}
                    className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors font-medium"
                  >
                    + Add Another Passenger
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg shadow-sm"
                >
                  {isLoading ? "Processing..." : "Confirm Booking"}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Booking Summary
              </h3>

              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">From</span>
                  <span className="font-semibold text-gray-900">{flight.from}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">To</span>
                  <span className="font-semibold text-gray-900">{flight.to}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Airline</span>
                  <span className="font-semibold text-gray-900">
                    {flight.airline}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Flight Number</span>
                  <span className="font-semibold text-gray-900">
                    {flight.flightNumber}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price per person</span>
                  <span className="font-semibold text-gray-900">
                    ₹{flight.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Passengers</span>
                  <span className="font-semibold text-gray-900">
                    {passengers.length}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹{calculateTotal().toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;