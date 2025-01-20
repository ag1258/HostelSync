import './App.css';
import StudentLandingPage from './components/studentLandingPage/studentLandingPage';
import LandingPage from './components/LadingPage/LandingPage';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Bookings from './components/booking/booking';
import AdminOrUser from './components/adminOrUser/adminOrUser';
import RegisterLogin from './components/LoginRegister/loginRegister';
import AdminLogin from './components/adminLogin/adminLogin';
import Dashboard from './components/Dashboard/Dashboard';
import Studentdetails from './components/Dashboard/Studentdetails';
import Account from './components/Dashboard/Account';
import Complaintbox from './components/Dashboard/Complaintbox';
import Gatepassdetails from './components/Dashboard/Gatepassdetails';
import Studentgatepass from './components/studentLandingPage/Studentgatepass';
import PaymentPage from './components/payment/PaymentForm';
import Complaint from './components/complaint/complaint';
import Gatepass from './components/gatepass/gatepass';
import ProfilePage from './components/profile/Profile';
import StudentComplaints from './components/complaint/StudentComplaints';
import { useEffect, useState } from "react";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import Announcement from './components/Dashboard/Announcement';
import Announcements from './components/announcement/Announcements';

function App() {
  const [tokenSaved, setTokenSaved] = useState(false);

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BDkRUBB4NI2Cjn6DJjouyD_gwL0l7WFzu6FgYdUJU-eFd7eW_p5RZQGBYkQ62-Bk9UM0i1cXCPJ5CzAA-dSy0mU",
      });

      if (token) {
        if (!tokenSaved) { 
          
        console.log("Token Gen", token);
          try {
            // Send this token to the server (backend) using fetch
            const response = await fetch("http://localhost:3005/save-token", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }), // Convert the token to JSON
            });

            if (response.ok) {
              console.log("Token saved to backend successfully!");
              setTokenSaved(true);  // Mark the token as saved
            } else {
              console.error(
                "Failed to save token to backend:",
                response.status,
                response.statusText
              );
            }
          } catch (error) {
            console.error("Error saving token to backend:", error.message);
          }
        }
      }
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    // Request user for notification permission
    requestPermission();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []); 

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/select' element={<AdminOrUser/>}/>
        <Route path='/user-signup' element={<RegisterLogin/>}/>
        <Route path='/admin-signup' element={<AdminLogin/>}/>
        <Route path='/user' element={<StudentLandingPage/>} />
        <Route path='/booking' element={<Bookings/>}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="studentdetails" element={<Studentdetails />} />
        <Route path="gatepasses" element={<Gatepassdetails />} />
        <Route path="/gatepass" element={<Gatepass />} />
        <Route path="complaintbox" element={<Complaintbox />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/complaints" element={<StudentComplaints />} />
        <Route path="announcement" element={<Announcement />} />
        <Route path="account" element={<Account />} />
        <Route path='/my-passes' element={<Studentgatepass/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
        <Route path='/me' element={<ProfilePage/>}/>
        <Route path='/announcements' element={<Announcements/>}/>
      </Routes>
    </Router>
  );
}

export default App;
