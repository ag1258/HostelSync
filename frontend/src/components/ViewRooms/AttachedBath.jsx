import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import back arrow icon

const AttachedBath = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  // Room details for each seater type with adjusted prices
  const roomDetails = [
    {
      id: 1,
      name: '1-Seater Room',
      description: 'A cozy room for a single person with a personal washroom.',
      price: '₹ 90,000/Sem',  // Most expensive
      imageUrl: 'https://i.pinimg.com/236x/5d/93/eb/5d93eb3b2ab4082652b6e86854b14aee.jpg',  // Use a higher resolution
    },
    {
      id: 2,
      name: '2-Seater Room',
      description: 'Compact room for 2 people with shared bathroom facilities.',
      price: '₹ 80,000/Sem',  // Second most expensive
      imageUrl: 'https://i.pinimg.com/736x/2c/8e/a9/2c8ea94bf57a77fa4a910a6099ba991e.jpg',
    },
    {
      id: 3,
      name: '3-Seater Room',
      description: 'Spacious room for 3 people with shared bathroom facilities.',
      price: '₹ 70,000/Sem',  // Third most expensive
      imageUrl: 'https://i.pinimg.com/236x/0f/39/75/0f39759bcf91c1c77b58d0910441309a.jpg',
    },
    {
      id: 4,
      name: '4-Seater Room',
      description: 'Large room for 4 people with shared bathroom facilities.',
      price: '₹ 60,000/Sem',  // Least expensive
      imageUrl: 'https://i.pinimg.com/736x/d7/27/56/d7275607b67b6c0ccd503b417c59c57e.jpg',  // Use a higher resolution
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
          <h1 className="text-4xl font-bold text-gray-800">Attached Bathrooms Hostel Rooms</h1>
          <p className="text-lg text-gray-600 mt-4">Explore our 1-Seater, 2-Seater, 3-Seater, and 4-Seater rooms with shared bathroom facilities</p>
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

export default AttachedBath;
