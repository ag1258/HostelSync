import React, { useState, useEffect } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Gatepassdetails = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [gatepassData, setGatepassData] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});

  useEffect(() => {
    // Fetch all gatepass details when the component mounts
    fetch("http://localhost:3005/gatepasseslist")
      .then((response) => response.json())
      .then((data) => {
        // Sort gatepasses by createdAt date in descending order
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setGatepassData(sortedData);
      })
      .catch((error) => console.error("Error fetching gatepass data:", error));
  }, []);

  const handleStatusChange = (e, id) => {
    const newStatus = e.target.value;
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: newStatus,
    }));
  };

  const saveStatusChange = (id) => {
    const updatedStatus = selectedStatuses[id];

    if (updatedStatus) {
      fetch(`http://localhost:3005/gatepass/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, status: updatedStatus }),
      })
        .then((response) => response.json())
        .then(() => {
          setGatepassData((prevData) =>
            prevData.map((gatepass) =>
              gatepass._id === id
                ? { ...gatepass, status: updatedStatus } 
                : gatepass
            )
          );
        })
        .catch((error) => console.error("Error updating status:", error));
    }
  };

  const renderStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-2xl" />;
      case "Rejected":
        return <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-2xl" />;
      case "Pending":
      default:
        return <FontAwesomeIcon icon={faSpinner} className="text-yellow-500 text-2xl animate-spin" />;
    }
  };

  // if (!gatepassData.length) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      <div className={`transition-all duration-300 ${isShrunk ? "ml-[80px]" : "ml-[300px]"} p-4 bg-white`}>
        {gatepassData.map((gatepass, index) => (
          <div key={index} className="w-full bg-gray-100 shadow-md rounded-lg p-4 flex items-center space-x-4 mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt={gatepass.studentId ? `${gatepass.studentId.firstName} ${gatepass.studentId.lastName}` : "Student"}
              className="w-[200px] h-[200px] rounded-full object-cover"
            />
            <div className="flex-1 ml-[100px] w-[500px] h-[150px]">
              <h3 className="text-lg font-semibold text-gray-900">
                {gatepass.studentId
                  ? `${gatepass.studentId.firstName} ${gatepass.studentId.lastName}`
                  : "Student Name"}
              </h3>
              <div className="text-sm text-gray-600">
                <p>Time of Gatepass: {gatepass.outday}</p>
                <p>Out Time: {gatepass.outtime}</p>
                <p>In Time: {gatepass.intime}</p>
                <p>Out Date: {new Date(gatepass.outdate).toLocaleDateString()}</p>
                {gatepass.indate && <p>In Date: {new Date(gatepass.indate).toLocaleDateString()}</p>}
                <p>Reason: {gatepass.reason}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              {gatepass.status === "Pending" ? (
                <>
                  <div className="flex items-center space-x-2">
                    <label htmlFor={`status-${index}`} className="text-gray-600">
                      Status:
                    </label>
                    <select
                      id={`status-${index}`}
                      value={selectedStatuses[gatepass._id] || gatepass.status}
                      onChange={(e) => handleStatusChange(e, gatepass._id)}
                      className="p-1 border border-gray-400 bg-gray-100 text-black rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <button
                    onClick={() => saveStatusChange(gatepass._id)}
                    className="p-2 bg-primary text-white rounded hover:bg-primary-dark"
                  >
                    Save
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  {renderStatusIcon(gatepass.status)}
                  <span className="text-black font-semibold">{gatepass.status}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Gatepassdetails;
