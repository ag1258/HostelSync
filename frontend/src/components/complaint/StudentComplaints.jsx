import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/navbar";
import Footer from "../footer/StudentFooter";
import { Link } from "react-router-dom";

const StudentComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          "http://localhost:3005/complaints/student",
          { withCredentials: true }
        );
        setComplaints(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Resolved":
        return "text-green-500";
      case "Under Processing":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[500px] flex space-x-2 my-5">
        <div className="sticky w-[500px] min-h-[300px] mx-[100px]">
          <img
            src="/9557011.jpg"
            alt="about"
            className="sticky h-[500px] w-[600px] top-0"
          />
        </div>
        <div>
          <Link to="/complaint">
            <button className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mx-[18px]">
              Register Complaint
            </button>
          </Link>

          {loading && (
            <div className="text-center text-blue-600 mt-5">
              Loading complaints...
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 mt-5">{error}</div>
          )}

          {complaints.length > 0
            ? complaints.map((complaint) => (
                <div
                  key={complaint._id}
                  className="complaint-details-box flex flex-col md:flex-row justify-between m-5 p-5 bg-gray-200 rounded-lg shadow-md text-black w-[850px]"
                >
                  {/* Left Section */}
                  <div className="left-side w-[600px] md:w-1/3 mb-4 md:mb-0">
                    <p>
                      <strong>Issue Type:</strong> {complaint.issueType}
                    </p>
                    <p>
                      <strong>Issue:</strong> {complaint.issue}
                    </p>
                    <p>
                      <strong>Description:</strong> {complaint.description}
                    </p>
                  </div>

                  {/* Right Section */}
                  <div className="right-side w-full md:w-1/2 flex flex-col items-center justify-center md:items-end leading-[3]">
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`${getStatusStyle(
                          complaint.status
                        )} font-semibold`}
                      >
                        {complaint.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            : !loading &&
              !error && (
                <div className="text-center text-gray-500 mt-5">
                  No complaints found.
                </div>
              )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentComplaints;
