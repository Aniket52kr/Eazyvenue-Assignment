import React, { useEffect, useState } from "react";
import axios from "axios";
import DealCard from "../../components/DealCard";
import Loader from "../../components/Loader";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/deal/my-bookings");
      setBookings(data._bookings);
    } catch (error) {
      console.error("Failed to load bookings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {loading ? (
        <Loader />
      ) : bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="space-y-4">
          {bookings.map(deal => (
            <DealCard key={deal._id} deal={deal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
