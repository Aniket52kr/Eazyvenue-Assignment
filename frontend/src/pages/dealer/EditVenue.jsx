import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:2000/api";

const EditVenue = () => {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    venueName: "",
    address: "",
    location: "",
    category: "",
    price: "",
    description: "",
  });

  const [venuePictures, setVenuePictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVenue = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/venues/venue/${venueId}`);
      const venue = res.data.venue;

      setFormData({
        venueName: venue.venueName || "",
        address: venue.address || "",
        location: venue.location || "",
        category: venue.category || "",
        price: venue.price || "",
        description: venue.description || "",
      });

      setLoading(false);
    } catch (err) {
      console.error("Error loading venue:", err);
      setError("Failed to load venue.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      fetchVenue();
    }
  }, [token, navigate, venueId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setVenuePictures(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    for (let file of venuePictures) {
      data.append("venuePicture", file);
    }

    try {
      await axios.patch(`${API_BASE_URL}/venues/venue/${venueId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Venue updated successfully.");
      navigate("/dealer/my-venues");
    } catch (err) {
      console.error("Update error:", err);
      alert(
        err?.response?.data?.msg ||
        err?.response?.data?.message ||
        "Failed to update venue."
      );
    }
  };

  if (loading) return <div className="p-6">Loading venue...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Edit Venue
        </h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="venueName"
            placeholder="Venue Name"
            value={formData.venueName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Venue
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditVenue;
