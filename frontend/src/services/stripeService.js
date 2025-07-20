import axios from "axios";

const API = import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:2000/api";


// Create Stripe Checkout Session
export const createStripeSession = async (bookingData, token) => {
  const res = await axios.post(`${API}/create-checkout-session`, bookingData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
