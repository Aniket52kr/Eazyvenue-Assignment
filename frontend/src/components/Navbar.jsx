import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const isDealer = user?.role === "dealer";
  const isClient = user?.role === "client";

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold">EazyVenue</Link>

      <div className="space-x-4 flex items-center">
        {!isDealer && (
          <>
            <Link to="/venues" className="hover:underline">Venues</Link>
            <Link to="/deals" className="hover:underline">Deals</Link>
          </>
        )}

        {/* Client Links */}
        {isClient && (
          <Link to="/client/dashboard" className="hover:underline">Dashboard</Link>
        )}

        {/* Dealer Links */}
        {isDealer && (
          <Link to="/dealer/dashboard" className="hover:underline">Dashboard</Link>
        )}

        {/* If not logged in */}
        {!user && (
          <>
            <Link to="/signin" className="hover:underline">Sign In</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}

        {/* Logout for authenticated users */}
        {user && (
          <button
            onClick={logout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
