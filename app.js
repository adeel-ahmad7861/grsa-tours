require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers/index');
const config = require('./config/config');
const http = require('http');

// Serve static files for uploads
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Use routes
app.use('/', router);

// Error handling middleware (general error handler)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(config.env === 'development' && { stack: err.stack }),
  });
});

// Start the server with custom timeout
const PORT = process.env.PORT || 3000;

// Create an HTTP server with increased timeout
const server = http.createServer(app);

// Increase the timeout to 5 minutes (300,000 ms)
server.timeout = 360000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;