import React, { useState, useEffect, useContext } from "react";
import { BACKENDURL } from "../Config/Config";
import { authContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Ticket from "../components/Ticket";

const Profile = () => {
  const navigate = useNavigate();
  const { state: authState } = useContext(authContext);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    const token = authState?.token || localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to view profile");
      navigate("/login");
      return;
    }
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const token = authState?.token || localStorage.getItem("token");

      const userRes = await fetch(`${BACKENDURL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData.user || userData);
      } else {
        console.log("Failed to fetch user data");
      }

      const bookingsRes = await fetch(`${BACKENDURL}/api/bookings/my-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData.bookings || bookingsData || []);
      } else {
        setBookings([]);
      }

      const walletRes = await fetch(`${BACKENDURL}/api/wallet`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (walletRes.ok) {
        const walletData = await walletRes.json();
        setWallet(walletData.wallet || walletData);
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.name}
                </h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Wallet Balance</p>
              <p className="text-3xl font-bold text-blue-600">
                ₹{wallet?.balance?.toLocaleString() || "0"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === "bookings"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                My Bookings ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === "details"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Account Details
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "bookings" ? (
              <div>
                {bookings.length > 0 ? (
                  <div className="space-y-6">
                    {bookings.map((booking) => (
                      <Ticket key={booking._id} booking={booking} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
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
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No Bookings Yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start exploring and book your first flight!
                    </p>
                    <button
                      onClick={() => navigate("/")}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Search Flights
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Account Information
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Full Name</span>
                    <span className="font-semibold text-gray-900">
                      {user?.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Email Address</span>
                    <span className="font-semibold text-gray-900">
                      {user?.email}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Wallet Balance</span>
                    <span className="font-semibold text-blue-600">
                      ₹{wallet?.balance?.toLocaleString() || "0"}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Total Bookings</span>
                    <span className="font-semibold text-gray-900">
                      {bookings.length}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(user?.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;