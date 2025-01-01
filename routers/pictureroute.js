const express = require('express');
const multer = require('multer');
const controller = require('../controller/picturecontroller');

const router = express.Router();

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to upload an image for a tour
router.post('/', upload.single('image'), controller.uploadPicture);

// Route to update an image for a tour
router.put('/', upload.single('image'), controller.updatePicture);

// Route to delete an image for a tour
router.delete('/', controller.deletePicture);

module.exports = router;
