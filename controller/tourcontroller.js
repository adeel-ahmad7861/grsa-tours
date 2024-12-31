const tour_data = require('../models/toursmodel'); // Import the tour model

// Save Tour
// const submittour = async (req, res) => {
//     try {
//         const newTour = new tour_data(req.body);  // Create a new tour using the request body
//         const result = await newTour.save();      // Save the tour to the database
//         res.status(201).json(result);             // Respond with the created tour data
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ message: 'Validation error', error: error.message }); // Handle validation errors
//     }
// };

const submittour = async (req, res) => {
    try {
        // Log start time
        console.log("Request received at:", new Date());

        // Validate input
        if (!req.body.name || !req.body.description) {
            return res.status(400).json({ message: "Name and description are required" });
        }

        // Create and save the new tour
        const newTour = new tour_data(req.body);
        console.log("Tour data created at:", new Date());

        // Save with write concern and timeout
        const result = await newTour.save({ writeConcern: { wtimeout: 5000 } });
        console.log("Saved to database at:", new Date());

        res.status(201).json(result);
    } catch (error) {
        console.error("Error occurred:", error, new Date());
        res.status(400).json({ message: 'Validation error', error: error.message });
    }
};


// Delete Tour
const deletetour = async (req, res) => {
    try {
        const result = await tour_data.findByIdAndDelete(req.body.id); // Find and delete the tour by ID
        if (!result) {
            return res.status(404).json({ message: 'Tour not found' }); // Respond if no tour found
        }
        res.status(200).json({ message: 'Tour deleted successfully', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

// Update Tour
const updatetour = async (req, res) => {
    try {
        const result = await tour_data.findByIdAndUpdate(
            req.body.id, 
            req.body, 
            { new: true, runValidators: true } // Return updated document and run validators
        );
        if (!result) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.status(200).json({mesage:'update successfuly',data:result}); // Respond with the updated tour data
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

// Search Tour
const searchtour = async (req, res) => {
    try {
        const result = await tour_data.find(req.body); // Find the tour by ID
        if (!result) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

module.exports = { submittour, deletetour, updatetour, searchtour };
