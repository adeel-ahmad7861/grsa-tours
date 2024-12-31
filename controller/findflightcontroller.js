// findflightController.js

const duffelAPI = require('../utils/flightauth');

const findflight = async (req, res) => {
  try {
    // Extract user inputs from the request body
    const {
      origin = 'LHE', // Default: Lahore
      destination = 'AUH', // Default: Abu Dhabi
      departure_date = '2024-12-30', // Default date
      cabin_class = 'economy', // Default: Economy class
      passengers = [{ type: 'adult' }], // Default: 1 adult
    } = req.body;

    // Make a POST request to the Duffel API
    const response = await duffelAPI.post('/air/offer_requests', {
      data: {
        slices: [
          {
            origin,
            destination,
            departure_date,
          },
        ],
        passengers,
        cabin_class,
      },
    });

    // Respond with the Duffel API response
    res.status(200).json(response.data);
  } catch (error) {
    // Handle errors and return a meaningful response
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: 'An unexpected error occurred' },
    });
  }
};


const getOfferDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract the offer ID from route parameters
    const { return_available_services = true } = req.query; // Optional query parameter

    if (!id) {
      return res.status(400).json({ message: 'Offer ID is required.' });
    }

    // Make a GET request to Duffel API for the offer details
    const response = await duffelAPI.get(`/air/offers/${id}`, {
      params: { return_available_services },
    });

    // Respond with the Duffel API data
    res.status(200).json(response.data);
  } catch (error) {
    // Handle errors and return a meaningful response
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: 'An unexpected error occurred' },
    });
  }
};

module.exports = { findflight,getOfferDetails };
