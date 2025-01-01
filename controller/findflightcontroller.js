const duffelAPI = require('../utils/flightauth');

const findflight = async (req, res) => {
  try {
    // Extract user inputs from the request body
    const {
      origin = 'LHE', // Default: Lahore
      destination = 'AUH', // Default: Abu Dhabi
      departure_date, // Outbound departure date
      return_date, // Optional: Return date for round-trip flights
      cabin_class = 'economy', // Default: Economy class
      passengers = [{ type: 'adult' }], // Default: 1 adult
    } = req.body;

    // Dynamically set the departure and return dates if not provided
    const outboundDate =
      departure_date ||
      (() => {
        const now = new Date();
        now.setDate(now.getDate() + 1); // Add 1 day (24 hours) to the current date
        return now.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      })();

    const returnDate =
      return_date ||
      (() => {
        const returnNow = new Date();
        returnNow.setDate(returnNow.getDate() + 7); // Add 7 days for a default return
        return returnNow.toISOString().split('T')[0];
      })();

    // Prepare slices for the Duffel API request
    const slices = [
      {
        origin,
        destination,
        departure_date: outboundDate,
      },
    ];

    // Add a return slice if the return_date is provided
    if (return_date || req.body.return_date) {
      slices.push({
        origin: destination, // Reverse origin and destination for the return trip
        destination: origin,
        departure_date: returnDate,
      });
    }

    // Make a POST request to the Duffel API
    const response = await duffelAPI.post('/air/offer_requests', {
      data: {
        slices,
        passengers,
        cabin_class,
      },
    });

    // Respond with the Duffel API response
    res.status(200).json({
      message: 'Flight offers retrieved successfully',
      data: response.data,
    });
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
    res.status(200).json({
      message: 'Offer details retrieved successfully',
      data: response.data,
    });
  } catch (error) {
    // Handle errors and return a meaningful response
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: 'An unexpected error occurred' },
    });
  }
};

module.exports = { findflight, getOfferDetails };
