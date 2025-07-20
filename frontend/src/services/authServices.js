import axios from "axios";

const API = import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:2000/api";


// Client Signup
export const clientSignup = async (data) => {
  const res = await axios.post(`${API}/client/signup`, data);
  return res.data;
};

// Client Signin
export const clientSignin = async (data) => {
  const res = await axios.post(`${API}/client/signin`, data);
  return res.data;
};

// Dealer Signup
export const dealerSignup = async (data) => {
  const res = await axios.post(`${API}/dealer/signup`, data);
  return res.data;
};

// Dealer Signin
export const dealerSignin = async (data) => {
  const res = await axios.post(`${API}/dealer/signin`, data);
  return res.data;
};

// Sign Out
export const signout = async (token) => {
  const res = await axios.post(`${API}/sign-out`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
