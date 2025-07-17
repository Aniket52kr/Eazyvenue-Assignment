import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneVenue } from '../../actions/venue.actions';
import axios from '../../helpers/axios';

const EditVenue = () => {
  const { venueId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const venue = useSelector((state) => state.venue?.venue);
  const auth = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    capacity: '',
    category: '',
    address: ''
  });

  useEffect(() => {
    dispatch(getOneVenue(venueId));
  }, [dispatch, venueId]);

  useEffect(() => {
    if (venue && venue._id === venueId) {
      setFormData({
        name: venue.name || '',
        location: venue.location || '',
        price: venue.price || '',
        capacity: venue.capacity || '',
        category: venue.category || '',
        address: venue.address || ''
      });
    }
  }, [venue, venueId]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (venue.owner !== auth.user._id) {
      alert('You are not authorized to edit this venue.');
      return;
    }

    try {
      const res = await axios.put(`/venue/update/${venueId}`, formData);
      if (res.status === 200) {
        alert('Venue updated successfully!');
        navigate(`/profile/${auth.user._id}`);
      } else {
        alert('Failed to update venue');
      }
    } catch (err) {
      alert('Error updating venue');
      console.error(err);
    }
  };

  if (!venue) {
    return <div className="text-center mt-8 text-gray-600">Loading venue details...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Edit Venue</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-1">Venue Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter venue name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-1">Location</label>
            <input
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-1">Address</label>
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter address"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-1">Category</label>
            <input
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Wedding Hall, Conference Room"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-1">Price</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-1">Capacity</label>
            <input
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter capacity"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
          >
            Update Venue
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditVenue;
