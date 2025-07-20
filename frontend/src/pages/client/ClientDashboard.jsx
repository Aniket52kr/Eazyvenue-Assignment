import React, { useEffect, useState } from "react";
import axios from "axios";
import VenueCard from "../../components/VenueCard";
import Loader from "../../components/Loader";

const ClientDashboard = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVenues = async () => {
    try {
      const { data } = await axios.get("/api/venues");
      setVenues(data.allVenues);
    } catch (error) {
      console.error("Error fetching venues", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Venues</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {venues.map(venue => (
            <VenueCard key={venue._id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
