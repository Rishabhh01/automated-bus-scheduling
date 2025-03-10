const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true
    },
    shift: {
        type: String,
        enum: ['Morning', 'Evening', 'Night'], // Adjust as needed
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
    availability: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
