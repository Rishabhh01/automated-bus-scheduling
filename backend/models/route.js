// const mongoose = require('mongoose');

// const routeSchema = new mongoose.Schema({
//     routeNumber: { type: String, required: true },
//     startLocation: { type: String, required: true },
//     endLocation: { type: String, required: true },
//     stops: [String],
//     timings: [String],
// });

// module.exports = mongoose.model('Route', routeSchema);
const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    number: { type: String, required: true },
    // Add other route fields if necessary
});

module.exports = mongoose.model('Route', routeSchema);
