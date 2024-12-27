// const express = require("express");
// const pictureController = require("../controller/picturecontroller");
// const user = express();
// const multer = require("multer");

// // const path = require("path");
// // const bodyParser = require("body-parser");

// // user.use(bodyParser.urlencoded({ extended: true }));
// // user.use(express.static(path.resolve(__dirname, "public")));


// const uploader = multer({
//     storage: multer.diskStorage({}),
//     limits: { fileSize: 500000 },
// });


// user.post('/', uploader.single("file"), pictureController.uploadFile);




// module.exports = user;

//router.post('/',(req, res) => {
//console.log('File:', req.file); // Log the uploaded file
//console.log('Body:', req.body); // Log the additional form fields (if any)
//res.status(200).json({ success: true, message: 'File uploaded successfully!' });
// });
        
// router.post('/', pictureController.uploadFile);




// const express = require("express");
// const pictureController = require('../controller/picturecontroller');
// const multer = require('multer');
// const router = express.Router(); 

// const uploadDir = './file';
// const uplode=multer({
//     storage:multer.diskStorage({
//         destination:function(req,file,cb){
//             cb(null,"file")
//         },
//         filename:function(req,file,cb){
//             cb(null,file.fieldname+"-"+Date.now()+".text");
//         }
//     })
// }).single("user_file");
// router.post('/uplode',uplode,pictureController.uploadFile);


// module.exports = router;



const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pictureController = require('../controller/picturecontroller');

const router = express.Router();

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Upload directory created');
}

// Multer configuration for file storage
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir); // Save files to the 'uploads' folder
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname); // Use the original file extension
            cb(null, `${file.fieldname}-${Date.now()}${ext}`);
        },
    }),
}).single('user_file'); // Match the form-data field name

// Route for file upload
router.post('/', upload, pictureController.uploadFile);

module.exports = router;



