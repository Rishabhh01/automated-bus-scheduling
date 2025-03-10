const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    License: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Experience: { type: Number, required: true },
    PreferredShift: { 
        type: String, 
        enum: ['Morning', 'Afternoon', 'Evening'], 
        required: true 
    },
    Region: { 
        type: String, 
        enum: ['North', 'East', 'West', 'South'], 
        required: true 
    },
    HoursDriven: { type: Number, default: 0 },
    availability: { type: Boolean, default: true },
    Assignments: [
        {
            Bus: String,
            Shift: String,
            Date: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model('Driver', DriverSchema);
