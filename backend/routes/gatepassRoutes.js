const express = require('express');
const router = express.Router();
const gate = require('../Controllers/gatepassController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/gatepass', gate.createGatepass);
router.get('/my-gatepass', verifyToken, gate.getMyGatepasses);
router.get('/gatepasseslist', gate.getGatepasses);
router.patch('/gatepass/status', gate.updateGatepassStatus);

module.exports = router;
