const express = require('express');
const router = express.Router();
const reserve = require('../Controllers/reservationController');

router.post('/reservation', reserve.reservation);
router.get('/reservationlist', reserve.getreservation);

module.exports = router;
