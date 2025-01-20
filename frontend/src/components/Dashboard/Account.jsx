import React, { useState } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Account = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  const adminProfile = {
    name: 'Anushka Chaudhary',
    email: 'anushka@gmail.com',
    role: 'Warden',
    phone: '123-456-7890',
    hostel: 'Hostel',
    profilePicture: 'https://via.placeholder.com/150',
  };

  // State to manage editable profile data
  const [editableProfile, setEditableProfile] = useState(adminProfile);

  // Handle input changes for editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Function to save changes
  const handleSaveChanges = () => {
    console.log("Saving changes:", editableProfile);
    setIsEditing(false);
  };

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />

      <div className={`transition-all duration-300 ${isShrunk ? "ml-[80px]" : "ml-[300px]"} bg-white flex justify-center items-center h-[91vh]`}>
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-primary">
            <img 
              src={editableProfile.profilePicture} 
              alt={`${editableProfile.name}`} 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="text-right text-black">
              <h3 className="text-lg font-semibold">
                {isEditing ? (
                  <input 
                    type="text" 
                    name="name" 
                    value={editableProfile.name} 
                    onChange={handleInputChange} 
                    className="border border-gray-300 rounded p-1"
                  />
                ) : (
                  editableProfile.name
                )}
              </h3>
              <p>{editableProfile.role}</p>
            </div>
          </div>
          <div className="p-3">
            <div className="mb-1 flex items-center">
              <p className="text-gray-700 mr-2">Email</p>
              {isEditing ? (
                <input 
                  type="email" 
                  name="email" 
                  value={editableProfile.email} 
                  onChange={handleInputChange} 
                  className="border border-gray-300 rounded p-1"
                />
              ) : (
                <p className="text-black break-words">{editableProfile.email}</p>
              )}
              {isEditing && <FontAwesomeIcon icon={faPencilAlt} className="w-5 h-5 text-primary-dark ml-2 cursor-pointer" />}
            </div>
            <div className="mb-1 flex items-center">
              <p className="text-gray-700 mr-2">Phone</p>
              {isEditing ? (
                <input 
                  type="text" 
                  name="phone" 
                  value={editableProfile.phone} 
                  onChange={handleInputChange} 
                  className="border border-gray-300 rounded p-1"
                />
              ) : (
                <p className="text-black break-words">{editableProfile.phone}</p>
              )}
              {isEditing && <FontAwesomeIcon icon={faPencilAlt} className="w-5 h-5 text-primary-dark ml-2 cursor-pointer" />}
            </div>
            <div className="mb-1 flex items-center">
              <p className="text-gray-700 mr-2">Hostel</p>
              {isEditing ? (
                <input 
                  type="text" 
                  name="hostel" 
                  value={editableProfile.hostel} 
                  onChange={handleInputChange} 
                  className="border border-gray-300 rounded p-1"
                />
              ) : (
                <p className="text-black break-words">{editableProfile.hostel}</p>
              )}
              {isEditing && <FontAwesomeIcon icon={faPencilAlt} className="w-5 h-5 text-primary-dark ml-2 cursor-pointer" />}
            </div>
          </div>
          <div className="bg-gray-100 px-3 py-2 text-right">
            <button 
              onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
              className="bg-primary text-white px-3 py-1 rounded-md shadow-md hover:bg-primary-dark transition"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
