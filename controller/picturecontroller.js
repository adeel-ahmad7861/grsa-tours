const Cloudinary = require('../utils/cloudinary');
const tour_data = require('../models/toursmodel');

exports.uploadPicture = async (req, res) => {
  try {
    console.log('Headers:', req.headers);
    console.log('Body (before multer):', req.body);
    console.log('File (before multer):', req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    // Upload directly to Cloudinary without saving locally
    const result = await Cloudinary.uploader.upload(req.file.buffer, {
      folder: 'uploads', // Optional folder organization in Cloudinary
      resource_type: 'image',
    });

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully!',
      fileDetails: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

     // Save the data in the existing Tour schema
     const tour = new Tour(tourData);
     await tour.save();

  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload file to Cloudinary',
      error: error.message,
    });
  }
};
