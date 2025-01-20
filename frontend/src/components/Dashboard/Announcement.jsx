import React, { useState } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import axios from 'axios';

const Announcement = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3005/add-announcement', {
        title,
        description,
      });
      alert('Announcement added successfully!');
      setTitle('');
      setDescription('');
    } catch (error) {
      alert('Failed to add announcement');
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
        <div className="bg-white shadow-md rounded-lg p-6 w-[1000px] ml-[100px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Announcement</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter announcement title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                placeholder="Enter announcement description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[200px] bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition"
            >
              Add Announcement
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Announcement;
