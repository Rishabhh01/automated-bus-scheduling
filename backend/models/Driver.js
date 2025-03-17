const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Driver's full name
    license: { type: String, required: true, unique: true }, // Unique license number
    password: { type: String, required: true }, // Hashed password (assumed to be stored hashed)
    experience: { type: Number, required: true }, // Years of experience
    preferredShift: { type: String, enum: ['Morning', 'Afternoon', 'Evening'], required: true }, // Shift preference
    region: { type: String, enum: ['North', 'East', 'West', 'South'], required: true }, // Assigned region
    hoursDriven: { type: Number, default: 0 }, // Total driving hours
    availability: { type: Boolean, default: true }, // Availability status
    age: { type: Number, required: true }, // Driver's age
    assignments: [
        {
            bus: String, // Assigned bus ID or number
            shift: String, // Shift timing
            date: { type: Date, default: Date.now }, // Assignment date
        }
    ],
});

module.exports = mongoose.model('Driver', DriverSchema);
