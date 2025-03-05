import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { Link } from "react-router-dom";

const StudentGatepass = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonPop, setButtonPop] = useState(false);
  const [gatepassDetails, setGatepassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGatepassDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3005/my-gatepass", {
          withCredentials: true,
        });
        console.log("gatepasses", response.data.data);
        setGatepassDetails(response.data.data);
      } catch (err) {
        setError("Failed to fetch gatepass details.");
      } finally {
        setLoading(false);
      }
    };

    fetchGatepassDetails();
  }, []);

  const handleMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  const getStatusIconAndText = (status) => {
    switch (status) {
      case "Approved":
        return (
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 text-2xl mr-2"
            />
            <span className="text-green-500">{status}</span>
          </div>
        );
      case "Rejected":
        return (
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faTimesCircle}
              className="text-red-500 text-2xl mr-2"
            />
            <span className="text-red-500">{status}</span>
          </div>
        );
      case "Pending":
        return (
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-yellow-500 text-2xl mr-2 animate-spin"
            />
            <span className="text-yellow-500">{status}</span>
          </div>
        );
      default:
        return null;
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
          <Link to="/gatepass">
            <button className="px-4 py-2 hover:bg-primary text-white font-semibold rounded-lg shadow-md bg-primary-dark focus:outline-none focus:ring-2 mx-[18px]">
              Apply Gate-Pass
            </button>
          </Link>

          {loading && (
            <div className="text-center text-blue-600 mt-5">
              Loading gatepass details...
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 mt-5">{error}</div>
          )}

          {gatepassDetails && gatepassDetails.length > 0
            ? gatepassDetails.map((details) => (
                <div
                  key={details._id}
                  className="gatepass-details-box left-side flex flex-col md:flex-row justify-between m-5 p-5 bg-gray-200 rounded-lg shadow-md text-black w-[850px]"
                >
                  {/* Left Section */}
                  <div className="left-side w-[600px] md:w-1/3 mb-4 md:mb-0">
                    <p className="flex justify-between w-[260px]">
                      <strong>Enrollment Number:</strong>{" "}
                      {details.enrollmentNumber}
                    </p>
                    <p>
                      <strong>Reason:</strong> {details.reason}
                    </p>
                    <p>
                      <strong>Out Day:</strong> {details.outday}
                    </p>
                    <p>
                      <strong>Out Time:</strong> {details.outtime}
                    </p>
                    <p>
                      <strong>In Time:</strong>{" "}
                      {details.intime ? details.intime : "Not Entered Yet"}
                    </p>
                    <p>
                      <strong>Out Date:</strong>{" "}
                      {details.outdate
                        ? new Date(details.outdate).toLocaleDateString()
                        : "Not Provided"}
                    </p>
                  </div>

                  {/* Right Section */}
                  <div className="right-side w-full md:w-1/2 flex flex-col items-center justify-center md:items-end leading-[3]">
                    <p className="flex justify-between w-[200px]">
                      <b>Status:</b> {getStatusIconAndText(details.status)}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {details.createdAt
                        ? new Date(details.createdAt).toLocaleString()
                        : "Not Available"}
                    </p>
                  </div>
                </div>
              ))
            : !loading &&
              !error && (
                <p className="text-center text-gray-500">
                  No gatepass details available.
                </p>
              )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentGatepass;
