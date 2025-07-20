import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    contactNumber: "",
    role: "client", 
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const BASE_URL = process.env.REACT_APP_API_BASE_URL;
      await axios.post(`${BASE_URL}/${userData.role}/signup`, userData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <label className="block mb-1">First Name</label>
        <input
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border rounded"
        />

        <label className="block mb-1">Last Name</label>
        <input
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border rounded"
        />

        <label className="block mb-1">Username</label>
        <input
          name="username"
          value={userData.username}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border rounded"
        />

        <label className="block mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border rounded"
        />

        <label className="block mb-1">Contact Number</label>
        <input
          name="contactNumber"
          type="text"
          value={userData.contactNumber}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border rounded"
        />

        <label className="block mb-1">Password</label>
        <input
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border rounded"
        />

        <label className="block mb-1">Select Role</label>
        <select
          name="role"
          value={userData.role}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-4 border rounded"
        >
          <option value="client">Client</option>
          <option value="dealer">Dealer</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
