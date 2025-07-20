import React from "react";
import { Link } from "react-router-dom";

const DealerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          Dealer Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/dealer/add-venue">
            <button className="w-full bg-blue-600 text-white text-lg py-3 rounded-lg hover:bg-blue-700 transition duration-200">
              ➕ Add New Venue
            </button>
          </Link>

          <Link to="/dealer/my-venues">
            <button className="w-full bg-green-600 text-white text-lg py-3 rounded-lg hover:bg-green-700 transition duration-200">
              🏢 View My Venues
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;
