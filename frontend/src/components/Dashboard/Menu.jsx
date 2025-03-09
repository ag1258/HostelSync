import React, { useState } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import axios from 'axios';

const Menu = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [title, setTitle] = useState('');
  const [month, setMonth] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image for the menu.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('month', month);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:3005/menu/addmenu', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Menu added successfully!');
      setTitle('');
      setMonth('');
      setImage(null);

      window.location.reload();
    } catch (error) {
      alert('Failed to add menu');
    }
  };

  return (
    <>
      {/* Sidebar and Navbar */}
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isShrunk ? 'ml-[80px]' : 'ml-[300px]'
        } p-4 bg-white min-h-screen `}
      >
        <div className="bg-gray-100 shadow-md rounded-lg p-6 w-[750px] ml-[100px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Menu</h2>
          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            {/* Title Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Menu Title</label>
              <input
                type="text"
                placeholder="Enter Menu title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>

            {/* Month Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Select Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                required
              >
                <option value="">Select Month</option>
                {[
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December',
                ].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Upload Menu Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[200px] bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition"
            >
              Add Menu
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Menu;
