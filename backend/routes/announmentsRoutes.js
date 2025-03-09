const express = require('express');
const router = express.Router();
const { createAnnouncement, getAnnouncement } = require('../Controllers/announcementController');

router.post('/addannouncement', createAnnouncement);
router.get('/announcements', getAnnouncement);

module.exports = router;
