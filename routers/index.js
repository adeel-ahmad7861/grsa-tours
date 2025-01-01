// const express = require('express');
// // const pictureroute = require('./pictureroute');
// const toursroute = require('./tourrouter');
// const flight = require('./findflightroute');
// const docsRoute = require('./docs.route');
// const config = require('../config/config');

// const router = express.Router();

// // Define your routes
// const defaultRoutes = [
//     // { path: '/', route: pictureroute },
//     { path: '/submit', route: toursroute },  
//     { path: '/delete', route: toursroute },  
//     { path: '/update', route: toursroute },  
//     { path: '/search', route: toursroute }, 
//     { path: '/flight', route: flight },  
// ];


// // Load routes
// defaultRoutes.forEach(({ path, route }) => {
//     router.use(path, route);
// });

// module.exports = router;

const express = require('express');
const toursroute = require('./tourrouter');
const flight = require('./findflightroute');
const pictureroute = require('./pictureroute');
const router = express.Router();

const defaultRoutes = [
    { path: '/upload', route: pictureroute },
    { path: '/submit', route: toursroute },
    { path: '/delete', route: toursroute },
    { path: '/update', route: toursroute },
    { path: '/search', route: toursroute },
    { path: '/flight', route: flight },
];

defaultRoutes.forEach(({ path, route }) => {
    router.use(path, route);
});

module.exports = router;
