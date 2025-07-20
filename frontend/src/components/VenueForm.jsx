import React, { useState } from 'react';

const VenueForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    venueName: '',
    address: '',
    location: '',
    category: '',
    price: '',
    description: '',
    pictures: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, pictures: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-1 font-semibold">Venue Name</label>
        <input
          name="venueName"
          value={form.venueName}
          onChange={handleChange}
          placeholder="e.g. Grand Palace"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Full address"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="City or region"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Wedding Hall, Conference Room"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Price (₹)</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="e.g. 5000"
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Tell more about the venue..."
          rows={4}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Pictures</label>
        <input
          type="file"
          name="pictures"
          multiple
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-2 rounded-lg"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Submit Venue
        </button>
      </div>
    </form>
  );
};

export default VenueForm;
