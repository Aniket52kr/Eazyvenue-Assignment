import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:2000/api"; // Ensure this matches your backend base URL

const BookVenue = () => {
  const { venueId } = useParams();
  const [eventDate, setEventDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/venues/${venueId}`);
        setVenue(res.data.venue);
      } catch (err) {
        console.error("Failed to fetch venue:", err);
        alert("Failed to load venue details.");
      }
    };

    fetchVenue();
  }, [venueId]);

  const handleBooking = async () => {
    if (!eventDate) return alert("Please select a date");
    if (!venue) return alert("Venue not loaded");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${API_BASE_URL}/api/deal/checkout`,
        {
          venueId,
          eventDate,
          venueName: venue.venueName,
          venueOwnerId: venue.ownerId,
          bill: venue.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message);
      alert("Error initiating booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Book Venue</h2>

      {venue && (
        <div className="mb-4">
          <p><strong>Name:</strong> {venue.venueName}</p>
          <p><strong>Price:</strong> ₹{venue.price}</p>
          <p><strong>Location:</strong> {venue.location}</p>
        </div>
      )}

      <label className="block mb-2">Event Date:</label>
      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        className="border px-3 py-2 w-full mb-4"
      />
      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Redirecting to Stripe..." : "Book Now"}
      </button>
    </div>
  );
};

export default BookVenue;
