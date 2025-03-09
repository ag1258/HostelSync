const express = require("express");
const app = express();
const announcement = require("../models/announcementModel");

const createAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log("Input Data", req.body);

    if (!title || !description) {
      return res
        .status(400)
        .send({ message: "Title and description are required." });
    }

    const newAnnouncement = new announcement({ title, description });
    const savedAnnouncement = await newAnnouncement.save();

    console.log("Saved Announcement:", savedAnnouncement);
    return res
      .status(201)
      .send({
        message: "Announcement successfully created",
        data: savedAnnouncement,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error creating announcement" });
  }
};

const getAnnouncement = async (req, res) => {
  try {
    const announcements = await announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch announcements." });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncement,
};
