import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h2>
      <p className="text-gray-700 mb-6">Thank you for booking with us. Your transaction is complete.</p>
      <Link to="/client/my-bookings">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View My Bookings
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
