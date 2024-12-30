// auth.js

const axios = require('axios');

// Duffel API configuration
const duffelAPI = axios.create({
  baseURL: 'https://api.duffel.com',
  headers: {
    Authorization: 'Bearer duffel_test_CmfqWLfDrl-sQppiRp4ueXEd9HYPqH3QPpnDUpY5fUu',
    'Content-Type': 'application/json',
    'Duffel-Version': 'v2',
  },
});

module.exports = duffelAPI;
