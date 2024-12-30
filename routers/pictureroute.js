

const router = require('express').Router();
const Cloudinary = require('../utils/cloudinary');
const upload = require('../middlewares/picturemulter');

router.post('/upload', upload.single('image'), (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Body (before multer):', req.body);
    console.log('File (before multer):', req.file);
  
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }
  
    // Handle file upload here
    res.status(200).json({
      success: true,
      message: 'File uploaded successfully!',
      file: req.file,
    });
  });
  
// module.exports = router;



