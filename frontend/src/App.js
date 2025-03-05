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
import Announcement from './components/Dashboard/Announcement';
import Announcements from './components/announcement/Announcements';
import CommonBath from './components/ViewRooms/CommonBath';
import AttachedBath from './components/ViewRooms/AttachedBath';
import ACAttachedBath from './components/ViewRooms/ACAttachedBath';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/CommonBath' element={<CommonBath/>}/>
        <Route path='/AttachedBath' element={<AttachedBath/>}/>
        <Route path='/ACAttachedBath' element={<ACAttachedBath/>}/>
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
