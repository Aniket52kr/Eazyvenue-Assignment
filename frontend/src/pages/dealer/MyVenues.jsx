import React, { useEffect, useState } from "react";
import axios from "axios";
import VenueCard from "../../components/VenueCard";
import Loader from "../../components/Loader";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:2000/api";

const MyVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/venues/my-venues`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVenues(res.data.venues || []);
      setError(null);
    } catch (err) {
      console.error("Error loading venues:", err);
      setError(
        err?.response?.data?.msg ||
        err?.response?.data?.message ||
        "Something went wrong while fetching venues."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (venueId) => {
  if (!venueId) return alert("Invalid venue ID.");
  const confirmDelete = window.confirm("Are you sure you want to delete this venue?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`${API_BASE_URL}/venues/${venueId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setVenues(prev => prev.filter(v => v._id !== venueId));
    alert("Venue deleted successfully.");
  } catch (err) {
    console.error("Delete error:", err);
    alert(
      err?.response?.data?.msg ||
      err?.response?.data?.message ||
      "Failed to delete the venue."
    );
  }
};


  useEffect(() => {
    if (!token) {
      setError("You are not logged in.");
      navigate("/signin");
    } else {
      fetchVenues();
    }
  }, [token, navigate]);

  if (loading) return <Loader />;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Venues</h2>

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 border border-red-300 p-4 rounded">
          <p>{error}</p>
          <button
            onClick={fetchVenues}
            className="mt-3 inline-block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
          >
            Retry
          </button>
        </div>
      )}

      {!error && venues.length === 0 ? (
        <div className="text-center text-gray-500">No venues added yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div
              key={venue._id}
              className="border border-gray-200 rounded-xl bg-white shadow-md p-4"
            >
              <VenueCard venue={venue} />
              <div className="mt-3 flex justify-between items-center">
                <Link
                  to={`/dealer/edit-venue/${venue._id}`}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(venue._id)}
                  className="text-red-500 hover:underline text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVenues;
