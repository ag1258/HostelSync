import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import back arrow icon

const ACAttachedBath = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  // Room details for each seater type with adjusted prices
  const roomDetails = [
    {
      id: 1,
      name: '1-Seater AC Room with Attached Bathroom',
      description: 'A cozy air-conditioned room for a single person with a personal washroom.',
      price: '₹ 100,000/Sem',  // Most expensive
      imageUrl: 'https://i.pinimg.com/236x/54/b0/02/54b0026d25f1abcf2ad78ec1564dcb55.jpg',  // Use a higher resolution
    },
    {
      id: 2,
      name: '2-Seater AC Room with Attached Bathroom',
      description: 'Comfortable air-conditioned room for 2 people with a private bathroom.',
      price: '₹ 90,000/Sem',  // Second most expensive
      imageUrl: 'https://i.pinimg.com/236x/7a/15/a9/7a15a9c2cc8064ccb0b073368dade352.jpg',
    },
    {
      id: 3,
      name: '3-Seater AC Room with Attached Bathroom',
      description: 'Spacious air-conditioned room for 3 people with a private bathroom.',
      price: '₹ 80,000/Sem',  // Third most expensive
      imageUrl: 'https://i.pinimg.com/736x/40/f7/a3/40f7a3529017e4b3aac2b2113505c345.jpg',  // Use a higher resolution
    },
    {
      id: 4,
      name: '4-Seater AC Room with Attached Bathroom',
      description: 'Large air-conditioned room for 4 people with a private bathroom.',
      price: '₹ 70,000/Sem',  // Least expensive
      imageUrl: 'https://i.pinimg.com/236x/13/6c/65/136c659e49f3a0f3e9eb2ea4fb34f625.jpg',  // Use a higher resolution
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Page Title and Back Button */}
      <div className="flex items-center mb-10">
        {/* Back Button with Arrow Icon */}
        <button 
          onClick={() => navigate(-1)}  // Navigate back to the previous page
          className="bg-gray-700 text-white p-3 rounded-full mr-6"  // Increased margin-right for more space
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-white text-2xl" />
        </button>

        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">AC Attached Bathrooms Hostel Rooms</h1>
          <p className="text-lg text-gray-600 mt-4">Explore our 1-Seater, 2-Seater, 3-Seater, and 4-Seater centralized ac rooms with attached bathroom facilities</p>
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {roomDetails.map((room) => (
          <div key={room.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Room Image */}
            <img src={room.imageUrl} alt={room.name} className="w-full h-64 object-contain" />
            <div className="p-6">
              {/* Room Name */}
              <h3 className="text-2xl font-semibold text-gray-800">{room.name}</h3>
              
              {/* Room Description */}
              <p className="text-gray-600 mt-2">{room.description}</p>

              {/* Room Price */}
              <h4 className="text-xl font-bold text-gray-900 mt-4">Starting from <span className="text-green-600">{room.price}</span></h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ACAttachedBath;
