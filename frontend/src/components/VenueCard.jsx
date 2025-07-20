import React, { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const API_BASE_URL = "http://localhost:2000";

const VenueCard = ({ venue }) => {
  const { user } = useContext(AuthContext);
  const isClient = user?.role === "client";

  const imagePath = venue?.venuePictures?.[0]?.img;
  const imageUrl = imagePath
    ? `${API_BASE_URL}/uploads/${encodeURIComponent(imagePath)}`
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={venue.venueName || "Venue"}
          className="w-full h-48 object-cover rounded"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      )}

      <div className="mt-2 flex flex-col">
        <h3 className="text-xl font-semibold">{venue.venueName}</h3>
        <p className="text-gray-600">{venue.location}</p>
        <p className="text-blue-600 font-bold">₹{venue.price}</p>

        <div className="flex justify-between mt-4">
          <Link
            to={`/venue/${venue._id}`}
            className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded"
          >
            Details
          </Link>

          {isClient && (
            <Link
              to={`/client/book/${venue._id}`}
              className="text-sm bg-blue-600 text-white hover:bg-blue-700 px-4 py-1 rounded"
            >
              Book
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(VenueCard);
