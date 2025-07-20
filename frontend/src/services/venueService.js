import axios from "axios";

const API = process.env.REACT_APP_API_BASE_URL || "http://localhost:2000/api";

// Add New Venue
export const addVenue = async (formData, token) => {
  const res = await axios.post(`${API}/venues/create-venue`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

// Get All Venues
export const getAllVenues = async () => {
  const res = await axios.get(`${API}/venues`);
  return res.data;
};

// Get Single Venue by ID
export const getVenueById = async (venueId) => {
  const res = await axios.get(`${API}/venues/${venueId}`);
  return res.data;
};

// Update Venue
export const updateVenue = async (venueId, formData, token) => {
  const res = await axios.put(`${API}/venues/${venueId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

// Get Venues by Dealer
export const getVenuesByDealer = async (token) => {
  const res = await axios.get(`${API}/dealer/my-venues`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
