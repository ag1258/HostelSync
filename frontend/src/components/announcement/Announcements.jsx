import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { Link } from "react-router-dom";
import announcement from "../../assets/accounments.png";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          "http://localhost:3005/announcement/announcements",
          { withCredentials: true }
        );
        setAnnouncements(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch announcements");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row items-center md:items-start space-x-0 md:space-x-8 px-5 md:px-20 my-8">
        {/* Left-side image */}
        <div className="w-full md:w-[450px] flex justify-center mb-6 md:mb-0">
          <img
            src={announcement}
            alt="Announcements"
            className="h-auto w-full max-w-[400px] md:max-w-none"
          />
        </div>

        {/* Announcements List */}
        <div className="w-full max-w-3xl">
          {loading && (
            <div className="text-center text-blue-600 mt-5 text-lg">
              Loading announcements...
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 mt-5">{error}</div>
          )}

          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div
                key={announcement._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-100 p-5 rounded-lg shadow-md text-black w-full mb-5"
              >
                {/* Left Section */}
                <div className="w-full md:w-2/3">
                  <p className="text-lg font-semibold">{announcement.title}</p>
                  <p className="text-gray-700 mt-1">{announcement.description}</p>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/3 text-gray-500 text-sm mt-3 md:mt-0 md:text-right">
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(announcement.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            !loading &&
            !error && (
              <p className="text-center text-gray-500 text-lg">
                No announcements available.
              </p>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Announcements;
