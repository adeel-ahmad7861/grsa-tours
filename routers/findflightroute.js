const express = require('express');
const controller = require('../controller/findflightcontroller');
const router = express.Router();

router.get('/', controller.findflight);

module.exports = router;
