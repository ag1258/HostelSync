const express = require('express');
const router = express.Router();
const complaint = require('../Controllers/complaintController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/usercomplaints', complaint.createComplaint);
router.get('/complaints', complaint.getComplaints);
router.put('/complaints/:id', complaint.updateComplaintStatus);
router.get('/complaints/student', verifyToken, complaint.getStudentComplaints);

module.exports = router;