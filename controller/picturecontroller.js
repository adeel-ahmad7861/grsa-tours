const Cloudinary = require('../utils/cloudinary');
const Tour = require('../models/toursmodel');

// Upload image for a tour
const uploadPicture = async (req, res) => {
  try {
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

    const { tourId } = req.body;

    if (!tourId) {
      return res.status(400).json({
        success: false,
        message: 'Tour ID is required to associate with the image.',
      });
    }

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found.',
      });
    }

    // Save the Cloudinary image URL in the tour document
    tour.picture = result.secure_url;

    // Save the updated tour document in the database
    await tour.save();

    res.status(200).json({
      success: true,
      message: 'File uploaded and tour data updated successfully!',
      fileDetails: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      tour,
    });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload file to Cloudinary and update tour data',
      error: error.message,
    });
  }
};

// Update image for a tour
const updatePicture = async (req, res) => {
  try {
    const { tourId, public_id } = req.body;

    if (!tourId || !public_id) {
      return res.status(400).json({
        success: false,
        message: 'Tour ID and public_id of the image are required.',
      });
    }

    // Delete old image from Cloudinary
    await Cloudinary.uploader.destroy(public_id);

    // Upload the new image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No new image uploaded',
      });
    }

    const result = await Cloudinary.uploader.upload(req.file.buffer, {
      folder: 'uploads',
      resource_type: 'image',
    });

    // Find the tour by ID and update the image URL
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found.',
      });
    }

    // Update the image URL in MongoDB
    tour.picture = result.secure_url;
    await tour.save();

    res.status(200).json({
      success: true,
      message: 'Image updated successfully!',
      fileDetails: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      tour,
    });
  } catch (error) {
    console.error('Image Update Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update image',
      error: error.message,
    });
  }
};

// Delete image for a tour
const deletePicture = async (req, res) => {
  try {
    const { tourId, public_id } = req.body;

    if (!tourId || !public_id) {
      return res.status(400).json({
        success: false,
        message: 'Tour ID and public_id of the image are required.',
      });
    }

    // Delete image from Cloudinary
    await Cloudinary.uploader.destroy(public_id);

    // Find the tour by ID and remove the image URL
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found.',
      });
    }

    // Remove the image URL from MongoDB
    tour.picture = null;
    await tour.save();

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully!',
      tour,
    });
  } catch (error) {
    console.error('Image Deletion Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image',
      error: error.message,
    });
  }
};

module.exports={updatePicture,deletePicture,uploadPicture};