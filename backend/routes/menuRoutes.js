const fs = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');
const { addMenu, getMenus } = require('../Controllers/menuController');

const router = express.Router();

// Ensure 'uploads/' directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// File Filter to Allow Only Images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/; // Allowed extensions
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); // Check extension
  const mimetype = fileTypes.test(file.mimetype); // Check MIME type

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error('Only JPG, JPEG, and PNG images are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post('/addmenu', upload.single('image'), addMenu);
router.get('/menus', getMenus);

module.exports = router;
