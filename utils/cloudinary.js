const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadFile = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { folder: 'uploads' });
        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Cloudinary upload failed');
    }
};

module.exports = { uploadFile };
