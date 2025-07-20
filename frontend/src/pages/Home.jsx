import React, { useEffect, useState } from "react";
import axios from "axios";
import VenueCard from "../components/VenueCard";
import Loader from "../components/Loader";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:2000/api";

const Home = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVenues = async () => {
  try {
    const response = await axios.get(`${API}/venues/all-venues`);
    setVenues(response.data.venues);
  } catch (error) {
    console.error("Error fetching venues:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchVenues();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Venues</h1>

      {loading ? (
        <Loader />
      ) : venues.length === 0 ? (
        <p className="text-center text-gray-600">No venues found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <VenueCard key={venue._id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
