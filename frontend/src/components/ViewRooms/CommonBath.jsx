import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import back arrow icon

const CommonBath = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  const rooms = [
    {
      id: 1,
      name: 'Common Bathroom',
      description: 'Shared bathroom with modern amenities.',
      imageUrl: 'https://i.pinimg.com/736x/ea/88/06/ea8806ed2451ca4d7a07dfc06a83f458.jpg',
    },
    {
      id: 2,
      name: '4-Seater Room',
      description: 'Large room for 4 people with shared bathroom.',
      price: '₹ 75,000/Sem',
      imageUrl: 'https://i.pinimg.com/736x/66/e5/de/66e5de92ffc9d93f35540a877ed1b47e.jpg',
    },
    {
      id: 3,
      name: '3-Seater Room ',
      description: 'Spacious room for 3 people with shared bathroom',
      price: '₹ 60,000/Sem',
      imageUrl: 'https://i.pinimg.com/736x/46/27/a9/4627a9b9a59dc033fca16e6594e1c5b1.jpg',
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
          <h1 className="text-4xl font-bold text-gray-800">Common Bathroom Hostel Rooms</h1>
          <p className="text-lg text-gray-600 mt-4">Explore our 3-Seater and 4-Seater rooms with shared bathroom facilities</p>
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Room Image */}
            <img src={room.imageUrl} alt={room.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              {/* Room Name */}
              <h3 className="text-2xl font-semibold text-gray-800">{room.name}</h3>
              
              {/* Room Description */}
              <p className="text-gray-600 mt-2">{room.description}</p>

              {/* Room Price */}
              {room.price && (
                <h4 className="text-xl font-bold text-gray-900 mt-4">
                  Starting from<span className="text-green-600"> {room.price}</span>
                </h4>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonBath;
