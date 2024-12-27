// const express = require('express');
// const router = express.Router();

// // Example route for documentation
// router.get('/', (req, res) => {
//     res.send('API Documentation');
// });

// module.exports = router;


const express = require('express');
const router = express.Router();

// Example route for documentation
router.get('/', (req, res) => {
    res.send('API Documentation');
});

module.exports = router;
