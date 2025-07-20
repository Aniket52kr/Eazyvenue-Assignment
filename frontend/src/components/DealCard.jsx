// components/DealCard.jsx
import React from 'react';

const DealCard = ({ deal }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-semibold">{deal.eventName}</h2>
      <p className="text-gray-600">Date: {deal.eventDate}</p>
      <p className="text-gray-600">User: {deal.clientInfo?.fullName}</p>
    </div>
  );
};

export default DealCard;