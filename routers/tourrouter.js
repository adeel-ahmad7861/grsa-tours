
// const express = require('express');
// const Tour= require('../middlewares/tourmiddleware');
// const tour= require('../controller/tourcontroller');
// const router = express.Router();

// // Register user
// router.post('/sumbit', Tour,tour);


// module.exports = router;

const express = require('express');
const middleware = require('../middlewares/tourmiddleware');  // Validation middleware
const controller = require('../controller/tourcontroller');  // Tour controller
const router = express.Router();

// Submit tour route
router.post('/', middleware.Toursubmit, controller.submittour);  // Call submittour from tourcontroller
// delete tour route
router.delete('/', middleware.Tourdelete, controller.deletetour);  // Call submittour from tourcontroller
// search tour route
router.get('/', middleware.Toursearch, controller.searchtour);  // Call submittour from tourcontroller
// update tour route
router.patch('/', middleware.Tourupdate, controller.updatetour);  // Call submittour from tourcontroller

module.exports = router;
