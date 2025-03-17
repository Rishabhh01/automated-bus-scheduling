const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true }, // Reference to Route model
    date: { type: Date, required: true },
    shift: { type: String, required: true },
});

module.exports = mongoose.model('Schedule', scheduleSchema);
