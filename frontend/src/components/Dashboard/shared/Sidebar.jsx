import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ isShrunk, setIsShrunk }) => {
  const toggleSidebar = () => {
    setIsShrunk(!isShrunk);
  };

  return (
    <div className={`fixed top-0 bottom-0 ${isShrunk ? "w-[80px]" : "w-[300px]"} bg-gradient-to-r from-gray-50 to-gray-100 p-2 transition-all duration-300`}>
      <span className='absolute text-white text-4xl top-3 left-4 cursor-pointer' onClick={toggleSidebar}>
        <i className={`bi ${isShrunk ? "bi-filter-right" : "bi-filter-left"} px-2 bg-primary-dark rounded-md`}></i>
      </span>

      <div className="text-center text-gray-100 mt-20">
        <Link to="/dashboard" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-primary-dark'>
          <i className='bi bi-house-door-fill text-xl px-3 py-2 rounded-md bg-primary'></i>
          <span className={`text-[17px] ml-4 text-gray-800 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Dashboard</span>
        </Link>

        <Link to="/studentdetails" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-primary-dark'>
          <i className='bi bi-backpack-fill text-xl px-3 py-2 rounded-md bg-primary'></i>
          <span className={`text-[17px] ml-4 text-gray-800 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Student Details</span>
        </Link>

        <Link to="/gatepasses" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-primary-dark'>
          <i className='bi bi-calendar-week-fill text-xl px-3 py-2 rounded-md bg-primary'></i>
          <span className={`text-[17px] ml-4 text-gray-800 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Gate Passes</span>
        </Link>

        <Link to="/complaintbox" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-primary-dark'>
          <i className='bi bi-box-fill text-xl px-3 py-2 rounded-md bg-primary'></i>
          <span className={`text-[17px] ml-4 text-gray-800 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Complaint Box</span>
        </Link>

        <Link to="/announcement" className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-primary-dark'>
          <i className='bi bi-buildings-fill text-xl px-3 py-2 rounded-md bg-primary'></i>
          <span className={`text-[17px] ml-4 text-gray-800 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Make Announcement</span>
        </Link>

        <Link to="/account" className='p-2.5 flex items-center rounded-md px-4 mt-20 duration-300 cursor-pointer group hover:bg-primary-dark'>
          <i className='bi bi-person-fill text-xl px-3 py-2 rounded-md bg-primary'></i>
          <span className={`text-[17px] ml-4 text-gray-800 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>Account</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
