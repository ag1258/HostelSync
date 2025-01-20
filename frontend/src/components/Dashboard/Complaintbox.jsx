import React, { useState, useEffect } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faExclamationCircle, faInfoCircle, faCheckCircle, faSpinner, faClock } from '@fortawesome/free-solid-svg-icons';

const Complaintbox = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:3005/complaints');
        setComplaints(response.data);
      } catch (err) {
        console.error('Error fetching complaints:', err);
      }
    };
    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:3005/complaints/${id}`, { status: newStatus });
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint._id === id ? { ...complaint, status: response.data.status } : complaint
        )
      );
    } catch (err) {
      console.error('Error updating complaint status:', err);
    }
  };

  const getIssueIcon = (issueType) => {
    switch (issueType) {
      case 'Maintenance':
        return faWrench;
      case 'Safety':
        return faExclamationCircle;
      case 'Information':
      default:
        return faInfoCircle;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Resolved':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-2xl" />;
      case 'Under Processing':
        return <FontAwesomeIcon icon={faSpinner} className="text-pink-500 text-2xl animate-spin" />;
      case 'Pending':
      default:
        return <FontAwesomeIcon icon={faClock} className="text-gray-500 text-2xl" />;
    }
  };

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      <div className={`transition-all duration-300 ${isShrunk ? "ml-[80px]" : "ml-[300px]"} p-4 bg-white`}>
        {complaints.map((complaint) => (
          <div key={complaint._id} className="w-full bg-white text-black shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="text-sm text-gray-700 mt-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <FontAwesomeIcon icon={getIssueIcon(complaint.issueType)} className="text-primary text-xl" />
                    <p className="font-medium text-primary">{complaint.issueType}</p>
                  </div>
                  <p className="text-gray-800 font-semibold">Issue: {complaint.issue}</p>
                  <p className="text-gray-600 mt-1">Description: {complaint.description}</p>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <p className="font-medium text-gray-800">Status:</p>
                  {getStatusIcon(complaint.status)}
                  <select
                    value={complaint.status}
                    onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                    className="ml-4 p-1 border border-gray-600 bg-gray-200 text-black rounded hover:bg-primary-dark transition"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Under Processing">Under Processing</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Complaintbox;
