import React, { useState, useEffect } from 'react';
import Sidebar from './shared/Sidebar';
import Navbar from './shared/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [isShrunk, setIsShrunk] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const [gatepassData, setGatepassData] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [complaintsCount, setComplaintsCount] = useState(0);

  useEffect(() => {
    // Fetch student data from backend
    fetch('http://localhost:3005/reservationlist')
      .then(response => response.json())
      .then(data => {
        setStudentCount(data.data.length);
      })
      .catch(error => console.error('Error fetching student data:', error));

    // Fetch gatepass data from backend
    fetch('http://localhost:3005/gatepasseslist')
      .then(response => response.json())
      .then(data => {
        const pending = data.filter(g => g.status === 'Pending').length;
        const approved = data.filter(g => g.status === 'Approved').length;
        const rejected = data.filter(g => g.status === 'Rejected').length;

        setGatepassData({ pending, approved, rejected });
      })
      .catch(error => console.error('Error fetching gatepass data:', error));

    // Fetch complaints data
    fetch('http://localhost:3005/complaintslist')
      .then(response => response.json())
      .then(data => {
        setComplaintsCount(data.length);
      })
      .catch(error => console.error('Error fetching complaints data:', error));
  }, []);

  // Chart data for gatepass doughnut chart
  const gatepassChartData = [
    { name: 'Pending', value: gatepassData.pending },
    { name: 'Approved', value: gatepassData.approved },
    { name: 'Rejected', value: gatepassData.rejected },
  ];

  const COLORS = ['#FDD128', '#5A9F68', '#f94449']; 
  // Colors for doughnut chart segments

  return (
    <>
      <Sidebar isShrunk={isShrunk} setIsShrunk={setIsShrunk} />
      <Navbar isShrunk={isShrunk} />
      <div className={`transition-all duration-300 ${isShrunk ? "ml-[80px]" : "ml-[300px]"} p-4 bg-white`}>

        <iframe src="https://lottie.host/embed/7dbb1397-bac3-48e4-9eb9-f54030984e28/FIcmC4NK9u.json" className='bg-gray-100 rounded-lg w-full h-[350px] mb-4'></iframe>

        <div className="grid grid-cols-3 gap-4">

          {/* Total Students Card */}
          <div className="bg-gray-100 text-black shadow-md rounded-lg p-4 flex flex-col items-center space-y-2 border border-gray-200">
            <h2 className="text-3xl font-semibold">Total Students</h2>
            <div className='flex flex-row items-center p-2 grid grid-cols-2 gap-4'>
              <p className="text-5xl font-bold text-black">{studentCount}</p>
              <FontAwesomeIcon icon={faUser} className="text-primary text-6xl ml-2" />
            </div>
            <p className="text-sm text-gray-500">(Number of students)</p>
          </div>

          {/* Gatepasses Card with Doughnut Chart */}
          <div className="bg-gray-100 text-black shadow-md rounded-lg p-4 flex flex-col space-y-2 space-x-6 border border-gray-200">
            <h2 className="text-3xl font-semibold text-center">Gatepasses</h2>
            <div className="flex items-center justify-between mt-4">
              {/* Legend on the left side */}
              <div className="flex flex-col mr-2">
                {gatepassChartData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-2 space-y-3">
                    <div
                      className="w-4 h-4 rounded-full p-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <p className="text-base">{entry.name}</p>
                  </div>
                ))}
              </div>
              
              {/* Pie Chart on the right side */}
              <PieChart width={130} height={121}>
                <Pie
                  data={gatepassChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                >
                  {gatepassChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>

          {/* Complaints Card with Indicator */}
          <div className="bg-gray-100 text-black shadow-md rounded-lg p-4 flex flex-col items-center space-y-2 border border-gray-200 ">
            <h2 className="text-lg font-semibold">Complaints</h2>
            <div className="flex justify-center items-center">
              <PieChart width={60} height={60}>
                <Pie
                  data={[{ name: 'Pending Complaints', value: complaintsCount }]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={20}
                  fill="#ff69b4"
                />
              </PieChart>
            </div>
            <p className="text-sm text-gray-500 ">(Pending Complaints)</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
