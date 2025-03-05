// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookie = require('cookie-parser')
// const complaint = require('./Controllers/complaintController')
// const reserve = require('./Controllers/reservationController')
// const gate = require('./Controllers/gatepassController');
// const gatepass = require('./models/gatepassModel');
// const userRoutes = require('./routes/userRoutes')
// const adminRoutes = require('./routes/adminRoutes')
// const Announcement = require('./models/announcementModel');
// const Token = require('./models/tokenModel');
// const Razorpay = require("razorpay")


// const app = express();
// // Initialize Firebase Admin SDK
// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount),
// // });

// // Now you can use Firebase Admin functionalities
// // const messaging = admin.messaging();



// const cookieParser = require('cookie-parser');
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PATCH", "PUT"],
//     credentials: true
// }));
// app.use(express.json());

// const Dbconnect = require('./middlewares/Db');
// const verifyToken = require('./middlewares/verifyToken');
// Dbconnect();

// app.use(cookieParser())

// app.use('/student', userRoutes)
// app.use('/admin', adminRoutes)
// app.use('/booking', reservationRoutes)
// app.use('')


// //Booking Routes
// app.post('/reservation',reserve.reservation);
// app.get('/reservationlist',reserve.getreservation);

// //GatePass Routes
// // app.post('/gatepass',gate.createGatepass)
// // app.get('/my-gatepass',verifyToken,gate.getMyGatepasses);
// // app.get('/gatepasseslist', async (req, res) => {
// //     try {
// //         const gatepasses = await gatepass.find().populate('studentId');
// //         res.json(gatepasses);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // });

// // app.patch('/gatepass/status', gate.updateGatepassStatus);

// //Complaints Routes
// app.post('/usercomplaints',complaint.createComplaint);
// app.get('/complaints',complaint.getComplaints);
// app.put('/complaints/:id', complaint.updateComplaintStatus);
// app.get('/complaints/student',verifyToken,complaint.getStudentComplaints);
// // API to save token
// app.post("/save-token", async (req, res) => {
//     const { token } = req.body;
  
//     try {
//       if (!token) {
//         return res.status(400).json({ message: "Token is required" });
//       }
  
//       // Save token to DB
//       await Token.updateOne(
//         { token },
//         { $setOnInsert: { token } },
//         { upsert: true }
//       );
//       res.status(201).json({ message: "Token saved successfully" });
//     } catch (error) {
//       console.error("Error saving token:", error.message);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });


// app.post('/add-announcement', async (req, res) => {
//     const registrationToken = 'fZXhmGMKbjaVdOq3qgOiga:APA91bEYNpmG_q1tqmlU0-fioD4YJHwqrzLQjLe94YI-wzOeVNT1c2f0oNCBlin0XMummeUSYAPCEKdhujYyNY9QlrE8bFvluG7nHNRh2WFRzuyyM6Z-NPU';

//     const message = {
//         notification: {
//             title: req.body.title,
//             body: req.body.description
//         },
//         token: registrationToken
//         };

//     messaging.send(message) 
//         .then((response) => {
//         console.log('Successfully sent message:', response);
//         })
//         .catch((error) => {
//         console.log('Error sending message:', error);  
//         });
//     try {
//         const { title, description } = req.body;
//         const announcement = new Announcement({ title, description });
//         await announcement.save();
//         res.status(201).json({ message: 'Announcement added successfully.' });
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to add announcement.' });
//       }
// });

// app.get('/announcements', async (req, res) => {
//     try {
//         const announcements = await Announcement.find().sort({ createdAt: -1 });
        
//         res.status(200).json(announcements);
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch announcements.' });
//       }
// });

// app.post('/orders', async (req, res) => {
//   const razorpay = new Razorpay({
//       key_id: "rzp_test_vrWmIdIupIjW1i",  
//       key_secret: "sXVoQKaFathEMO2lNk232vos" 
//   });

//   const options = {
//       amount: req.body.amount,
//       currency: req.body.currency,
//       receipt: "receipt#1",
//       payment_capture: 1
//   };

//   try {
//       const response = await razorpay.orders.create(options);
//       res.json({
//           order_id: response.id,
//           currency: response.currency,
//           amount: response.amount
//       });
//   } catch (error) {
//       console.error('Error creating Razorpay order:', error);
//       res.status(500).send({
//           message: "Internal server error",
//           error: error.response ? error.response.data : error.message
//       });
//   }
// });


// app.get("/payment/:paymentId", async(req, res) => {
//   const {paymentId} = req.params;

//   const razorpay = new Razorpay({
//       key_id: "rzp_test_HA0dblFvRuSZ2X",
//       key_secret: "WnueYlnYvG1GD7pVoQZv9OzE"
//   })

//   try {
//       const payment = await razorpay.payments.fetch(paymentId)

//       if(!payment){
//           return res.status(500).json("Error at razorpay loading")
//       }

//       res.json({
//           status: payment.status,
//           method: payment.method,
//           amount: payment.amount,
//           currency: payment.currency
//       })
//   } catch (error) {
//       res.status(500).json("Failed to fetch")
//   }
// })

// app.listen(3005, () => {
//     console.log('Server started on 3005');
// });

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
const paymentRoutes = require('./routes/paymentRoutes');

// Use Routes
app.use('/student', userRoutes);
app.use('/admin', adminRoutes);
app.use('/booking', reservationRoutes);
app.use('/gatepass', gatepassRoutes);
app.use('/complaint', complaintRoutes);
app.use('/announcement', announcementRoutes);
app.use('/payment', paymentRoutes);

// Start Server
app.listen(3005, () => {
  console.log('Server started on 3005');
});
