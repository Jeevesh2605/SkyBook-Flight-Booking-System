import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKENDURL } from "../Config/Config";
import FlightCard from "../components/FlightCard";
import { toast } from "react-toastify";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchData = location.state;

  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("price");

  useEffect(() => {
    if (!searchData) {
      navigate("/");
      return;
    }
    fetchFlights();
  }, [searchData]);

  const fetchFlights = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        from: searchData.from,
        to: searchData.to,
        date: searchData.date,
      });

      const response = await fetch(
        `${BACKENDURL}/api/flights/search?${params}`
      );
      const data = await response.json();

      if (response.ok) {
        setFlights(data.flights || data);
      } else {
        toast.error(data.message || "Failed to fetch flights");
        setFlights([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search flights");
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  const sortFlights = (flightsToSort) => {
    const sorted = [...flightsToSort];
    switch (sortBy) {
      case "price":
        return sorted.sort((a, b) => a.price - b.price);
      case "duration":
        return sorted.sort(
          (a, b) =>
            new Date(a.arrivalTime) -
            new Date(a.departureTime) -
            (new Date(b.arrivalTime) - new Date(b.departureTime))
        );
      case "departure":
        return sorted.sort(
          (a, b) => new Date(a.departureTime) - new Date(b.departureTime)
        );
      default:
        return sorted;
    }
  };

  const sortedFlights = sortFlights(flights);

  if (!searchData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
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

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {searchData.from} → {searchData.to}
              </h1>
              <p className="text-gray-600">
                {new Date(searchData.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" • "}
                {searchData.passengers}{" "}
                {searchData.passengers === 1 ? "Passenger" : "Passengers"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-600">
              {isLoading ? (
                "Searching flights..."
              ) : (
                <>
                  <span className="font-semibold text-gray-900">
                    {sortedFlights.length}
                  </span>{" "}
                  {sortedFlights.length === 1 ? "flight" : "flights"} found
                </>
              )}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
            >
              <option value="price">Lowest Price</option>
              <option value="duration">Shortest Duration</option>
              <option value="departure">Earliest Departure</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm animate-pulse"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                    <div>
                      <div className="w-24 h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="w-16 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                </div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : sortedFlights.length > 0 ? (
          <div className="space-y-4">
            {sortedFlights.map((flight) => (
              <FlightCard key={flight._id} flight={flight} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Flights Found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any flights matching your search criteria. Try
              adjusting your search parameters.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Search Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;