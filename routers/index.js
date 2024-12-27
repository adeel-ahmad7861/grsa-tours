const express = require('express');
const pictureroute = require('./pictureroute');
const toursroute = require('./tourrouter');
const docsRoute = require('./docs.route');
const config = require('../config/config');

const router = express.Router();

// Define your routes
const defaultRoutes = [
    { path: '/upload', route: pictureroute },
    { path: '/submit', route: toursroute },  // Ensure '/submit' is in this array
    { path: '/delete', route: toursroute },  // Ensure '/submit' is in this array
    { path: '/update', route: toursroute },  // Ensure '/submit' is in this array
    { path: '/search', route: toursroute },  // Ensure '/submit' is in this array
];


// Load routes
defaultRoutes.forEach(({ path, route }) => {
    router.use(path, route);
});

module.exports = router;
