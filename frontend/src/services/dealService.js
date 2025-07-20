import axios from "axios";

const API = import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:2000/api";


// Book a Deal
export const bookVenue = async (dealData, token) => {
  const res = await axios.post(`${API}/deal/book`, dealData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

// Get All Bookings of a Client
export const getClientBookings = async (token) => {
  const res = await axios.get(`${API}/deal/client-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

// Get All Bookings for Dealer's Venues
export const getDealerBookings = async (token) => {
  const res = await axios.get(`${API}/deal/dealer-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
