import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ isShrunk, setIsShrunk }) => {
  const toggleSidebar = () => {
    setIsShrunk(!isShrunk);
  };

  return (
    <div className={`fixed top-0 bottom-0 ${isShrunk ? "w-[80px]" : "w-[300px]"} bg-gradient-to-r from-gray-50 to-gray-100 p-2 transition-all duration-300`}>
      {/* Sidebar Toggle Button */}
      <span className='absolute text-white text-4xl top-3 left-4 cursor-pointer' onClick={toggleSidebar}>
        <i className={`bi ${isShrunk ? "bi-filter-right" : "bi-filter-left"} px-2 bg-primary-dark rounded-md`}></i>
      </span>

      {/* Sidebar Items */}
      <div className="text-center text-gray-100 mt-20">
        <SidebarLink to="/dashboard" icon="bi-house-door-fill" label="Dashboard" isShrunk={isShrunk} />
        <SidebarLink to="/studentdetails" icon="bi-backpack-fill" label="Student Details" isShrunk={isShrunk} />
        <SidebarLink to="/gatepasses" icon="bi-calendar-week-fill" label="Gate Passes" isShrunk={isShrunk} />
        <SidebarLink to="/complaintbox" icon="bi-box-fill" label="Complaint Box" isShrunk={isShrunk} />
        <SidebarLink to="/announcement" icon="bi-megaphone-fill" label="Make Announcement" isShrunk={isShrunk} />
        <SidebarLink to="/menu" icon="bi-card-list" label="Add Menu" isShrunk={isShrunk} />
      </div>

      {/* Account Section */}
      <div className="mt-6">
        <SidebarLink to="/account" icon="bi-person-fill" label="Account" isShrunk={isShrunk} />
      </div>
    </div>
  );
};

/* Sidebar Link Component */
const SidebarLink = ({ to, icon, label, isShrunk }) => (
  <Link to={to} className='p-2.5 flex items-center rounded-md px-4 mt-3 duration-300 cursor-pointer group hover:bg-primary-dark'>
    <i className={`bi ${icon} text-xl px-3 py-2 rounded-md bg-primary text-white`}></i>
    <span className={`text-[17px] ml-4 text-gray-800 font-bold group-hover:text-white ${isShrunk ? "hidden" : "block"}`}>{label}</span>
  </Link>
);

export default Sidebar;
