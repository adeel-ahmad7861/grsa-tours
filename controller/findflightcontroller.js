const axios = require('axios');

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
    const response = await axios.post(
      'https://api.duffel.com/air/offer_requests',
      {
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
      },
      {
        headers: {
          Authorization: 'Bearer duffel_test_CmfqWLfDrl-sQppiRp4ueXEd9HYPqH3QPpnDUpY5fUu',
          'Content-Type': 'application/json',
          'Duffel-Version': 'v2',
        },
      }
    );

    // Respond with the Duffel API response
    res.status(200).json(response.data);
  } catch (error) {
    // Handle errors and return a meaningful response
    res.status(error.response?.status || 500).json({
      error: error.response?.data || { message: 'An unexpected error occurred' },
    });
  }
};

module.exports = { findflight };
