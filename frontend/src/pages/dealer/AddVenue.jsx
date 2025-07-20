import React from "react";
import VenueForm from "../../components/VenueForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:2000/api";

const AddVenue = () => {
  const navigate = useNavigate();

  const handleVenueSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      const payload = new FormData();
      payload.append("venueName", formData.venueName);
      payload.append("address", formData.address);
      payload.append("location", formData.location);
      payload.append("category", formData.category);
      payload.append("price", formData.price);
      payload.append("description", formData.description);
      formData.pictures.forEach((file) =>
        payload.append("venuePicture", file)
      );

      const res = await axios.post(
        `${API}/venues/create-venue`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        alert("Venue created successfully!");
        navigate("/dealer/my-venues");
      }
    } catch (error) {
      console.error("Error creating venue:", error);
      alert("Failed to create venue.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Add New Venue
        </h2>
        <VenueForm onSubmit={handleVenueSubmit} />
      </div>
    </div>
  );
};

export default AddVenue;
