import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/navbar";
import Footer from "../footer/StudentFooter";

const MenuPage = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    // Fetch menu data from the backend
    const fetchMenus = async () => {
      try {
        const response = await axios.get("http://localhost:3005/menu/menus");
        setMenus(response.data); // Assuming the backend returns an array of menu objects
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenus();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Hostel Menu
        </h2>

        {/* Display menu items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menus.length > 0 ? (
            menus.map((menu) => (
              <div
                key={menu._id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center w-[400px] mx-auto"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                  {menu.month}
                </h3>
                <img
                  src={`http://localhost:3005/uploads/${menu.image}`}
                  alt={`${menu.month} Menu`}
                  className="w-full h-[450px] object-cover rounded-lg"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center w-full">
              No menu available
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MenuPage;
