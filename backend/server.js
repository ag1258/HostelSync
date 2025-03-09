const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Dbconnect = require('./middlewares/Db');

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "PUT"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Connect to Database
Dbconnect();

// Import Routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const gatepassRoutes = require('./routes/gatepassRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const announcementRoutes = require('./routes/announmentsRoutes');
const menuRoutes = require('./routes/menuRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Use Routes

app.use('/uploads', express.static('uploads'));

app.use('/student', userRoutes);
app.use('/admin', adminRoutes);
app.use('/booking', reservationRoutes);
app.use('/gatepass', gatepassRoutes);
app.use('/complaint', complaintRoutes);
app.use('/announcement', announcementRoutes);
app.use('/menu', menuRoutes);
app.use('/payment', paymentRoutes);

// Start Server
app.listen(3005, () => {
  console.log('Server started on 3005');
});
