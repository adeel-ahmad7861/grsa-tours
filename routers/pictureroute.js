const router = require('express').Router();
const upload = require('../middlewares/picturemulter');
const { uploadPicture } = require('../controller/picturecontroller');

router.post('/', upload.single('image'), uploadPicture);

module.exports = router;
