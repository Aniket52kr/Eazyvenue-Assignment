// components/EditVenueForm.jsx
import React from 'react';

const EditVenueForm = ({ form, setForm, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="venueName" value={form.venueName} onChange={handleChange} placeholder="Venue Name" className="input" />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input" />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="input" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input" />
      <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Price" className="input" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" />
      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">Update</button>
    </form>
  );
};

export default EditVenueForm;