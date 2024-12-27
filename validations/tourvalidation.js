const Joi = require('joi');

const objectId = Joi.string().hex().length(24); // Validate MongoDB ObjectId

const toursubmit = Joi.object({
    country: Joi.string().required().trim(),
    city: Joi.string().required().trim(),
    flights: Joi.string().required().trim(),
    hotels: Joi.string().required().trim(),
    resorts: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
});

const tourdelete = Joi.object({
    id: objectId.required(), // Use ObjectId validation for the `id`
});

const toursearch = Joi.object({
    id: objectId.optional(), // `id` is optional for search
    country: Joi.string().optional().trim(),
    city: Joi.string().optional().trim(),
    flights: Joi.string().optional().trim(),
    hotels: Joi.string().optional().trim(),
    resorts: Joi.string().optional().trim(),
});

const tourupdate = Joi.object({
    id: objectId.required(), // `id` is required for updates
    country: Joi.string().optional().trim(),
    city: Joi.string().optional().trim(),
    flights: Joi.string().optional().trim(),
    hotels: Joi.string().optional().trim(),
    resorts: Joi.string().optional().trim(),
    description: Joi.string().optional().trim(),
});

module.exports = { toursubmit, tourdelete, toursearch, tourupdate };
