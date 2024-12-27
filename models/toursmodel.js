const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        trim:true
    },
    city: {
        type: String,
        required: true,
        trim:true
    },
    flights: {
        type: String,
        required: true,
        trim:true
    },
    hotels: {
        type: String,
        required: true,
        trim:true
    },
    resorts: {
        type: String,
        required: true,
        trim:true
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    picture:{
        type:String,
        // required:true
    }
    
}, { timestamps: true });

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
