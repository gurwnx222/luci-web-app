"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { getBookingSocket, connectBookingUser, disconnectBookingSocket } from "../lib/bookingSocket";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.18.47:3000";

export default function BookingPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salonOwnerId, setSalonOwnerId] = useState(null);
  const socketRef = useRef(null);

  // Check localStorage for salonOwnerId on mount and when it changes
  useEffect(() => {
    const checkLocalStorage = () => {
      const storedId = localStorage.getItem("salonOwnerId");
      if (storedId) {
        console.log("✅ Found salon owner ID in localStorage:", storedId);
        setSalonOwnerId(storedId);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkLocalStorage()) {
      return;
    }

    // Listen for storage events (when localStorage changes in another tab/window)
    const handleStorageChange = (e) => {
      if (e.key === "salonOwnerId" && e.newValue) {
        console.log("✅ Salon owner ID updated in localStorage:", e.newValue);
        setSalonOwnerId(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check periodically (for same-tab updates)
    const interval = setInterval(() => {
      const storedId = localStorage.getItem("salonOwnerId");
      if (storedId && storedId !== salonOwnerId) {
        console.log("✅ Detected salon owner ID change:", storedId);
        setSalonOwnerId(storedId);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [salonOwnerId]);

  // Fetch salon owner ID from backend based on user email (if logged in)
  useEffect(() => {
    const fetchSalonOwnerId = async () => {
      // If we already have an ID from localStorage, skip
      if (salonOwnerId) {
        return;
      }

      if (!user || !user.email) {
        console.log("⏳ Not logged in - using localStorage only. Set salonOwnerId in localStorage to continue.");
        return;
      }

      try {
        // First check localStorage (for quick access)
        const cachedOwnerId = localStorage.getItem("salonOwnerId");
        if (cachedOwnerId) {
          console.log("✅ Using cached salon owner ID:", cachedOwnerId);
          setSalonOwnerId(cachedOwnerId);
          return;
        }

        // Try to find salon owner by email - we'll need to check if there's an endpoint
        // For now, let's try fetching all salons and finding the one that matches
        console.log("🔍 Searching for salon owner with email:", user.email);
        
        // First, try to get salon by owner email (if such endpoint exists)
        // Otherwise, we'll need to manually set it or use a different approach
        let ownerId = null;
        
        // Try fetching salons and finding one that matches the email
        try {
          const salonsResponse = await fetch(
            `${API_BASE_URL}/api/v1/salons?limit=100`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          
          if (salonsResponse.ok) {
            const salonsData = await salonsResponse.json();
            if (salonsData.success && salonsData.data) {
              // Find salon where owner email matches
              const matchingSalon = salonsData.data.find((salon) => {
                const ownerEmail = salon.owner?.salonOwnerEmail || 
                                 salon.ownerEmail || 
                                 salon.salonOwnerEmail;
                return ownerEmail && ownerEmail.toLowerCase() === user.email.toLowerCase();
              });
              
              if (matchingSalon) {
                ownerId = matchingSalon.ownerId || 
                         matchingSalon.owner?._id || 
                         matchingSalon.owner?._id?.toString();
                if (ownerId) {
                  console.log("✅ Found salon owner ID from salon list:", ownerId);
                }
              }
            }
          }
        } catch (salonErr) {
          console.warn("⚠️ Could not fetch salons:", salonErr);
        }
        
        if (!ownerId) {
          console.warn("⚠️ Salon owner not found for email:", user.email);
          console.warn("💡 Please register as a salon owner first or set salonOwnerId in localStorage");
          setError("Salon owner profile not found. Please register as a salon owner first.");
          return;
        }
        
        console.log("✅ Found salon owner ID:", ownerId);
        setSalonOwnerId(ownerId.toString());
        localStorage.setItem("salonOwnerId", ownerId.toString());
      } catch (err) {
        console.error("❌ Error fetching salon owner ID:", err);
        // Don't set error here - allow manual localStorage setup
      }
    };

    fetchSalonOwnerId();
  }, [user, salonOwnerId]);

  // Setup SocketIO listeners for booking notifications
  useEffect(() => {
    if (!salonOwnerId) return;

    const socket = getBookingSocket(salonOwnerId);
    socketRef.current = socket;

    // Connect user
    connectBookingUser(salonOwnerId);

    // Listen for new booking requests
    socket.on("booking_notification", (data) => {
      console.log("📬 New booking notification:", data);
      // Refresh bookings list
      fetchBookings();
      
      // Show browser notification
      if (Notification.permission === "granted") {
        new Notification("New Booking Request", {
          body: data.booking?.customerName
            ? `New booking request from ${data.booking.customerName}`
            : "You have a new booking request",
          icon: "/logo.png",
        });
      }
    });

    // Listen for booking status updates
    socket.on("booking_status_update", (data) => {
      console.log("📬 Booking status update:", data);
      // Update booking in list
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === data.bookingId
            ? { ...booking, status: data.status }
            : booking
        )
      );
    });

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => {
      socket.off("booking_notification");
      socket.off("booking_status_update");
      disconnectBookingSocket();
    };
  }, [salonOwnerId]);

  // Fetch bookings
  const fetchBookings = async () => {
    if (!salonOwnerId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/api/v1/bookings/list?salonOwnerId=${salonOwnerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      if (data.success && data.bookings) {
        // Filter to show pending bookings first, then others
        const sortedBookings = data.bookings.sort((a, b) => {
          if (a.status === "pending" && b.status !== "pending") return -1;
          if (a.status !== "pending" && b.status === "pending") return 1;
          return (
            new Date(b.appointmentDetails.requestedDateTime) -
            new Date(a.appointmentDetails.requestedDateTime)
          );
        });
        setBookings(sortedBookings);
      }
    } catch (err) {
      console.error("❌ Error fetching bookings:", err);
      setError(err.message || "Failed to fetch bookings. Please check your connection.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [salonOwnerId]);

  // Accept booking
  const handleAccept = async (bookingId) => {
    if (!salonOwnerId) {
      alert("Salon owner ID not found");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/bookings/${bookingId}/accept`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ salonOwnerId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to accept booking");
      }

      const data = await response.json();
      
      // Update booking in list
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "accepted", conversation: data.conversation }
            : booking
        )
      );

      // If chat room was created, navigate to chat
      if (data.conversation?.id) {
        // You can navigate to chat page here
        console.log("Chat room created:", data.conversation.id);
        // Example: router.push(`/chats?conversationId=${data.conversation.id}`);
      }

      alert("Booking accepted successfully!");
    } catch (err) {
      console.error("Error accepting booking:", err);
      alert(err.message || "Failed to accept booking");
    }
  };

  // Reject booking
  const handleReject = async (bookingId) => {
    if (!salonOwnerId) {
      alert("Salon owner ID not found");
      return;
    }

    if (!confirm("Are you sure you want to reject this booking request?")) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/bookings/${bookingId}/reject`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ salonOwnerId }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to reject booking");
      }

      // Update booking in list
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status: "rejected" } : booking
        )
      );

      alert("Booking rejected");
    } catch (err) {
      console.error("Error rejecting booking:", err);
      alert(err.message || "Failed to reject booking");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="w-full h-auto flex items-center justify-center py-20">
        <div className="text-[#262628]">Loading bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-auto flex items-center justify-center py-20">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!salonOwnerId) {
    return (
      <div className="w-full h-auto flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <div className="text-[#262628] text-lg font-semibold mb-4">
            {error || "Salon Owner Profile Not Found"}
          </div>
          <div className="text-[#5F5F60] text-sm mb-4">
            {error 
              ? "Please check your connection and try again."
              : "Please register as a salon owner first, or manually set your salon owner ID in localStorage."}
          </div>
          {!error && (
            <div className="bg-[#EDCFC9] p-4 rounded-lg text-left">
              <div className="text-[#262628] text-sm font-semibold mb-2">
                Quick Setup (for testing):
              </div>
              <div className="text-[#5F5F60] text-xs mb-2">
                1. Open browser console (F12)
              </div>
              <div className="text-[#5F5F60] text-xs mb-2">
                2. Run: <code className="bg-white px-1 rounded">localStorage.setItem("salonOwnerId", "YOUR_OWNER_ID")</code>
              </div>
              <div className="text-[#5F5F60] text-xs mb-3">
                3. The page will automatically detect the change (no refresh needed)
              </div>
              <button
                onClick={() => {
                  const storedId = localStorage.getItem("salonOwnerId");
                  if (storedId) {
                    setSalonOwnerId(storedId);
                    console.log("✅ Manually loaded salon owner ID:", storedId);
                  } else {
                    alert("Please set salonOwnerId in localStorage first!");
                  }
                }}
                className="bg-[#D96073] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#C85563] transition-colors"
              >
                Check localStorage Now
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto">
      <div className="font-bold text-2xl sm:text-3xl md:text-[40px] text-[#262628] px-4 sm:px-8 md:px-12 lg:px-22 pt-8 sm:pt-10 md:pt-12 pb-4 sm:pb-6">
        Booking Requests
      </div>
      {bookings.length === 0 ? (
        <div className="px-4 sm:px-8 md:px-12 lg:px-22 py-20 text-center text-[#5F5F60]">
          No booking requests yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-4 sm:px-8 md:px-12 lg:px-22 overflow-y-auto max-h-[450px] sm:max-h-[500px] md:max-h-[550px] gap-4 sm:gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-[#EDCFC9] p-6 sm:p-8 md:p-10 border-2 rounded-4xl border-[#FFAE9E] w-full max-w-[313px] mx-auto h-auto"
            >
              <div className="flex gap-2 justify-start items-center">
                <Image
                  src="/images/person1.png"
                  alt={booking.requester.name}
                  width={43}
                  height={43}
                  className="rounded-4xl border-2 border-[#999999] object-cover w-10 h-10 sm:w-[43px] sm:h-[43px]"
                />
                <div className="flex-1">
                  <div className="font-normal text-sm sm:text-base text-[#262628]">
                    {booking.requester.name}
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-6 sm:mt-8">
                <div className="font-normal text-sm sm:text-base leading-tight text-[#5F5F60]">
                  Bio -
                </div>
                <div className="font-normal text-lg sm:text-xl leading-tight text-[#262628]">
                  Age - {booking.requester.bio?.age || "N/A"}
                </div>
                <div className="font-normal text-lg sm:text-xl leading-tight text-[#262628]">
                  Weight - {booking.requester.bio?.weightKg || "N/A"}kg
                </div>
                <div className="font-normal text-sm leading-tight text-[#5F5F60] mt-2">
                  Date: {formatDate(booking.appointmentDetails?.requestedDateTime)}
                </div>
                <div className="font-normal text-sm leading-tight text-[#5F5F60]">
                  Duration: {booking.appointmentDetails?.durationMinutes || 60} minutes
                </div>
              </div>
              {booking.status === "pending" && (
                <div className="flex gap-4 sm:gap-6 md:gap-30 mt-4">
                  <button
                    onClick={() => handleReject(booking._id)}
                    className="rounded-2xl bg-[#F69DAB] cursor-pointer hover:bg-[#F28B9C] transition-colors p-2 sm:p-0"
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 46 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 sm:w-10 sm:h-10"
                    >
                      <path
                        d="M29.2275 31.1127C29.4775 31.3628 29.8166 31.5032 30.1703 31.5032C30.5239 31.5032 30.863 31.3628 31.1131 31.1127C31.3631 30.8627 31.5036 30.5235 31.5036 30.1699C31.5036 29.8163 31.3631 29.4772 31.1131 29.2271L24.5134 22.6274L31.1131 16.0278C31.3631 15.7777 31.5036 15.4386 31.5036 15.085C31.5036 14.7313 31.3631 14.3922 31.1131 14.1422C30.863 13.8921 30.5239 13.7516 30.1703 13.7516C29.8166 13.7516 29.4775 13.8921 29.2275 14.1422L22.6278 20.7418L16.0281 14.1422C15.7781 13.8921 15.4389 13.7516 15.0853 13.7516C14.7317 13.7516 14.3926 13.8921 14.1425 14.1422C13.8925 14.3922 13.752 14.7313 13.752 15.085C13.752 15.4386 13.8925 15.7777 14.1425 16.0278L20.7422 22.6274L14.1425 29.2271C13.8925 29.4772 13.752 29.8163 13.752 30.1699C13.752 30.5235 13.8925 30.8627 14.1425 31.1127C14.3926 31.3628 14.7317 31.5032 15.0853 31.5032C15.4389 31.5032 15.7781 31.3628 16.0281 31.1127L22.6278 24.5131L29.2275 31.1127Z"
                        fill="#262628"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleAccept(booking._id)}
                    className="rounded-2xl bg-[#D96073] w-10 sm:w-12 cursor-pointer flex justify-center items-center hover:bg-[#C85563] transition-colors"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 sm:w-7 sm:h-7"
                    >
                      <g clipPath="url(#clip0_545_83)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M28.2563 7.28662C28.5062 7.53666 28.6466 7.87574 28.6466 8.22929C28.6466 8.58284 28.5062 8.92192 28.2563 9.17196L13.2669 24.1626C13.1307 24.2989 12.969 24.407 12.791 24.4807C12.613 24.5545 12.4223 24.5924 12.2296 24.5924C12.0369 24.5924 11.8462 24.5545 11.6682 24.4807C11.4902 24.407 11.3285 24.2989 11.1923 24.1626L3.74426 16.7146C3.62038 16.5907 3.52211 16.4437 3.45507 16.2818C3.38802 16.12 3.35352 15.9465 3.35352 15.7713C3.35352 15.5961 3.38802 15.4226 3.45507 15.2608C3.52211 15.0989 3.62038 14.9518 3.74426 14.828C3.86814 14.7041 4.0152 14.6058 4.17706 14.5388C4.33892 14.4717 4.5124 14.4372 4.68759 14.4372C4.86278 14.4372 5.03626 14.4717 5.19812 14.5388C5.35998 14.6058 5.50704 14.7041 5.63092 14.828L12.2309 21.428L26.3696 7.28662C26.6196 7.03666 26.9587 6.89624 27.3123 6.89624C27.6658 6.89624 28.0062 7.03666 28.2563 7.28662Z"
                          fill="#FFF6EF"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_545_83">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
