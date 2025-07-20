import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import Signout from "../pages/auth/Signout";

// Client Pages
import ClientDashboard from "../pages/client/ClientDashboard";
import BookVenue from "../pages/client/BookVenue";
import MyBookings from "../pages/client/MyBookings";
import PaymentSuccess from "../pages/client/PaymentSuccess";

// Dealer Pages
import DealerDashboard from "../pages/dealer/DealerDashboard";
import AddVenue from "../pages/dealer/AddVenue";
import MyVenues from "../pages/dealer/MyVenues";
import EditVenue from "../pages/dealer/EditVenue";

// Components
import ProtectedRoute from "../components/ProtectedRoute";

// Auth Context
import useAuth from "../hooks/useAuth";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signout" element={<Signout />} />

      {/* Client Routes */}
      <Route
        path="/client/dashboard"
        element={
          <ProtectedRoute role="client">
            <ClientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/book/:venueId"
        element={
          <ProtectedRoute role="client">
            <BookVenue />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/bookings"
        element={
          <ProtectedRoute role="client">
            <MyBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/payment-success"
        element={
          <ProtectedRoute role="client">
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />

      {/* Dealer Routes */}
      <Route
        path="/dealer/dashboard"
        element={
          <ProtectedRoute role="dealer">
            <DealerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dealer/add-venue"
        element={
          <ProtectedRoute role="dealer">
            <AddVenue />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dealer/my-venues"
        element={
          <ProtectedRoute role="dealer">
            <MyVenues />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dealer/edit-venue/:venueId"
        element={
          <ProtectedRoute role="dealer">
            <EditVenue />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
