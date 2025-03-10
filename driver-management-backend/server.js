
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const util = require('util');
const execPromise = util.promisify(exec);
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Models
const Driver = require('./models/Driver');
const Bus = require('./models/Bus');

// Driver Routes

// Create new driver
app.post('/drivers', async (req, res) => {
    const driver = new Driver(req.body);
    try {
        await driver.save();
        res.status(201).json(driver);
    } catch (error) {
        console.error('Error adding driver:', error);
        res.status(500).json({ message: 'Error adding driver', error });
    }
});

// Get all drivers
app.get('/drivers', async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).json({ message: 'Error fetching drivers', error });
    }
});

// Get a specific driver by ID
app.get('/drivers/:id', async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.json(driver);
    } catch (error) {
        console.error('Error fetching driver:', error);
        res.status(500).json({ message: 'Error fetching driver', error });
    }
});

//to display assignment 
// app.get('/drivers/:id', async (req, res) => {
//     try {
//         const driverId = req.params.id;
//         const driver = await Driver.findById(driverId);
//         const assignment = await Assignment.findOne({ driverId: driverId });

//         if (driver && assignment) {
//             const bus = await Bus.findById(assignment.busId);
//             res.json({ ...driver.toObject(), assignedBus: bus ? bus.number : null });
//         } else {
//             res.status(404).json({ error: 'Driver or assignment not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching driver data' });
//     }
// });


// Update a driver's availability by ID
app.put('/drivers/:id', async (req, res) => {
    const { id } = req.params;
    const { availability } = req.body;

    try {
        const driver = await Driver.findByIdAndUpdate(
            id,
            { availability },
            { new: true, useFindAndModify: false }
        );

        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        res.json(driver);
    } catch (error) {
        console.error('Error updating driver availability:', error);
        res.status(500).json({ message: 'Error updating driver availability', error });
    }
});

// Bus Routes

// Create new bus
app.post('/buses', async (req, res) => {
    const bus = new Bus(req.body);
    try {
        await bus.save();
        res.status(201).json(bus);
    } catch (error) {
        console.error('Error adding bus:', error);
        res.status(500).json({ message: 'Error adding bus', error });
    }
});

// Get all buses
app.get('/buses', async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (error) {
        console.error('Error fetching buses:', error);
        res.status(500).json({ message: 'Error fetching buses', error });
    }
});

// Get a specific bus by ID
app.get('/buses/:id', async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        res.json(bus);
    } catch (error) {
        console.error('Error fetching bus:', error);
        res.status(500).json({ message: 'Error fetching bus', error });
    }
});

// Update a bus's availability by ID
app.put('/buses/:id/availability', async (req, res) => {
    const { id } = req.params;
    const { availability } = req.body;

    try {
        const bus = await Bus.findByIdAndUpdate(
            id,
            { availability },
            { new: true, useFindAndModify: false }
        );

        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        res.json(bus);
    } catch (error) {
        console.error('Error updating bus availability:', error);
        res.status(500).json({ message: 'Error updating bus availability', error });
    }
});

// Scheduling Route

// Route to trigger scheduling



// Schedule Route
app.post('/schedule', async (req, res) => {
    try {
        const { stdout, stderr } = await execPromise(`python "${path.join(__dirname, "ml.py")}"`);

        if (stderr) {
            console.error(`Error executing script: ${stderr}`);
            return res.status(500).json({ message: 'Error executing scheduling script.', error: stderr });
        }

        // Check if output is JSON
        let result;
        try {
            result = JSON.parse(stdout);
            console.log('Parsed JSON result:', result); // Log the parsed result
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            console.error('Script output:', stdout);
            return res.status(500).json({ message: 'Invalid JSON output from scheduling script.', error: stdout });
        }

        res.json(result);
    } catch (error) {
        console.error('Error scheduling:', error);
        res.status(500).json({ message: 'Error scheduling.', error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
