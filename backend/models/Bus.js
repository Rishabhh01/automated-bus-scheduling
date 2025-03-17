const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    shift: {
        type: String,
        enum: ['Morning', 'Evening', 'Night'], // Bus operating shifts
        required: true
    },
    region: {
        type: String,
        required: true
    },
    routeDifficulty: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    start: {
        type: String,
        required: true // Start location (e.g., Delhi)
    },
    destination: {
        type: String,
        required: true // Destination location (e.g., Mumbai)
    },
    totalStops: {
        type: Number,
        required: true // Total number of stops on the route
    },
    availability: {
        type: Boolean,
        default: true // Indicates whether the bus is available for scheduling
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
