const express = require("express");
const router = express.Router();

const fileUploader = require('../config/cloudinary.config');

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// POST /api/upload - Upload User profile pic to Cloudinary
router.post('/upload', fileUploader.single('userProfileImgUrl'), (req, res, next) => {
  if(!req.file) {
    next(new Error("No file uploaded!!!"));
    return;
  }

  res.json({ fileUrl: req.file.path });
});

module.exports = router;
