const express = require('express');
const app = express();
const gatepass = require('../models/gatepassModel');
const reservation = require('../models/reservationModel');
const User = require('../models/studentModel'); 
const nodemailer = require('nodemailer');

const createGatepass = async (req, res) => {
    try {
        const inputData = req.body;
        console.log('Input Data', inputData);

        if (!inputData.outday) {
            return res.status(403).send({ message: 'Please Select Out Day Time' });
        }

        if (!inputData.reason || !inputData.outtime || !inputData.intime || !inputData.outdate) {
            return res.status(400).send({ message: 'Must fill all fields' });
        }

        if (inputData.outday === 'Night Out' && !inputData.indate) {
            return res.status(400).send({ message: 'Must fill indate for Night Out' });
        }

        const studentReservation = await reservation.findOne({ enrollmentNumber: inputData.enrollmentNumber });
        const user = await User.findOne({enrollmentID:inputData.enrollmentNumber});
        console.log('user', user);
        
        if (!studentReservation) {
            return res.status(404).send({ message: 'No reservation found' });
        }

        console.log("hehehehhe",user._id);
        
        const newGatePass = new gatepass({
            ...inputData,
            studentId: studentReservation._id,
            userId: user._id,
        });
        
        const data = await newGatePass.save();

        return res.status(201).send({ message: 'GatePass created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error creating Gatepass' });
    }
};


const getGatepasses = async (req, res) => {
    try {
        const gatepasses = await gatepass.find().populate('studentId');
        return res.status(200).json({
            message: 'Gatepasses retrieved successfully',
            data: gatepasses
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error retrieving gatepasses');
    }
};

const getMyGatepasses = async (req, res) => {
    console.log('Request received for my gatepasses:', req.enrollmentID);
    try{
        const gatepasses = await gatepass.find({ enrollmentNumber: req.enrollmentID });
        return res.status(200).json({
            message: 'Gatepasses retrieved successfully',
            data: gatepasses
        });

    }
    catch(err){
        console.error(err);
        return res.status(500).send('Error retrieving gatepasses');
    }
}

// const updateGatepassStatus = async (req, res) => {
//     try {
//         const { _id, status } = req.body;

//         if (!_id || !status) {
//             return res.status(400).json({ message: 'Missing gatepass ID or status' });
//         }
//         const gatepasses = await gatepass.findById(_id);
//         console.log('gatepasses:', gatepasses);
        
//         if (!gatepasses) {
//             return res.status(404).json({ message: 'Gatepass not found' });
//         }
//         gatepasses.status = status;
//         const updatedGatepass = await gatepasses.save();
//         res.json(updatedGatepass);
//     } catch (error) {
//         console.error('Error updating gatepass status:', error);
//         res.status(500).json({ message: 'Error updating gatepass status', error: error.message });
//     }
// };

const updateGatepassStatus = async (req, res) => {
    try {
        const { _id, status } = req.body;

        // Validate request body
        if (!_id || !status) {
            return res.status(400).json({ message: "Missing gatepass ID or status" });
        }

        // Find the gatepass by ID and populate studentId
        const gatepasses = await gatepass.findById(_id).populate("userId");

        if (!gatepasses) {
            return res.status(404).json({ message: "Gatepass not found" });
        }

        // Update the status
        gatepasses.status = status;
        const updatedGatepass = await gatepasses.save();

        // Check if status is "Approved" and email exists
        console.log(gatepasses.userId);
        
        if (status === "Approved" && gatepasses.userId?.email) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port:465,
                secure: true,
                // service: "gmail", // Replace with your email provider
                auth: {
                    user: "anshika1304.be22@chitkara.edu.in", // Replace with your email
                    pass: "wqwa uogj lytb eqrv", // Replace with your app-specific password
                },
            });

            const mailOptions = {
                from: "anshika1304.be22@chitkara.edu.in", // Sender email
                to: gatepasses.userId.email, // Recipient email
                subject: "Gatepass Approved",
                text: `Dear ${gatepasses.studentId.name},\n\nYour gatepass has been approved.\n\nDetails:\nEnrollment Number: ${gatepasses.enrollmentNumber}\nOut Date: ${gatepasses.indate ? new Date(gatepasses.indate).toLocaleDateString() : "Not Specified"}\n\nBest regards,\nYour Institution`,
            };

            await transporter.sendMail(mailOptions);
            console.log("Approval email sent successfully to", gatepasses.studentId.email);
        }

        // Respond with the updated gatepass
        res.json(updatedGatepass);
    } catch (error) {
        console.error("Error updating gatepass status:", error);
        res.status(500).json({
            message: "Error updating gatepass status",
            error: error.message,
        });
    }
};

module.exports = {
    createGatepass,
    getGatepasses,
    updateGatepassStatus, 
    getMyGatepasses,
};