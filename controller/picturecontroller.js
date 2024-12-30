const express = require('express');
const router = express.Router();
const Cloudinary = require('../utils/cloudinary');
const upload = require('../middlewares/picturemulter');

router.post('/', upload.single('image'), (req, res) => {
  console.log('File:', req.file);
  console.log('Body:', req.body);

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
    });
  }

  // Upload to Cloudinary
  Cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      console.error('Cloudinary Upload Error:', err);
      return res.status(500).json({
        success: false,
        message: 'Error uploading to Cloudinary',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Uploaded successfully!',
      data: result,
    });
  });
});

module.exports = router;
