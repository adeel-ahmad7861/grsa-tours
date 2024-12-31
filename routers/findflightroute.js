const express = require('express');
const controller = require('../controller/findflightcontroller');
const router = express.Router();

router.get('/', controller.findflight);
router.get('/:id', controller.getOfferDetails);

module.exports = router;
