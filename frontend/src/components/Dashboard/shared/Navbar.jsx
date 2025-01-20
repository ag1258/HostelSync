import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isShrunk }) => {
  return (
    <div
      className={`bg-white text-gray-900 flex justify-between items-center px-4 py-3 transition-all duration-300 ${isShrunk ? "ml-[80px]" : "ml-[300px]"} ${isShrunk ? "w-[calc(100%-80px)]" : "w-[calc(100%-300px)]"} `}
    >
      <div className="text-2xl font-bold text-primary">
        Hostel Sync
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img src="https://via.placeholder.com/30" alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="font-semibold text-gray-700">Admin</span>
          <NavLink to="/">
            <button className="btn nav__btn bg-primary text-white px-4 py-2 rounded-md transition-colors duration-200 hover:bg-primary-dark">
              Logout
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
