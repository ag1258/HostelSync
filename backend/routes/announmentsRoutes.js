const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcementModel');

router.post('/add-announcement', async (req, res) => {
  try {
    const { title, description } = req.body;
    const announcement = new Announcement({ title, description });
    await announcement.save();
    res.status(201).json({ message: 'Announcement added successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add announcement.' });
  }
});

router.get('/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch announcements.' });
  }
});

module.exports = router;
