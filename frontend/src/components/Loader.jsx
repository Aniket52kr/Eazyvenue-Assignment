// components/Loader.jsx
import React from 'react';

const Loader = () => (
  <div className="flex justify-center items-center h-40">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

export default Loader;