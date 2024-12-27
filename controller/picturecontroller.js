// const Store = require('../models/toursmodel');
// const Upload = require("../helpers/uplode");

// const uploadFile = async (req, res) => {
    
//     console.log(req.body);
//     try {
//         console.log(req.file?.path);
//         const upload = await Upload.uploadFile(req.file.path);
//         const store = new Store({
//             picture: upload.secure_url
//         });
//         const record = await store.save();
//         res.send({ success: true, msg: 'File Uploaded Successfully!', url: record });
//     } catch (error) {
//         console.log(error)
//         res.send({ success: false, msg: error.message });
//     }
// };

// module.exports = { uploadFile }; // Export as an object


const Store = require('../models/toursmodel');
const Upload = require('../utils/cloudinary');

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, msg: 'No file uploaded' });
        }

        const upload = await Upload.uploadFile(req.file.path); // Upload file to Cloudinary
        const store = new Store({
            picture: upload.secure_url, // Save Cloudinary URL
            ...req.body, // Merge request body data
        });

        const record = await store.save();
        res.status(201).json({ success: true, msg: 'File uploaded successfully', data: record });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: error.message });
    }
};

module.exports = { uploadFile };





