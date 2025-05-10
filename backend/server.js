
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { spawn } = require('child_process');
const Driver = require('./models/driver');
const Bus = require('./models/bus');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

/**
 * ========================
 * DRIVER ROUTES
 * ========================
 */

// ✅ Fetch all drivers
app.get('/drivers', async (req, res) => {
  try {
    const drivers = await Driver.find();
    console.log('Fetched drivers:', drivers);
    res.json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ message: 'Error fetching drivers', error });
  }
});

// ✅ Add a new driver
app.post('/drivers', async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
  } catch (error) {
    console.error('Error adding driver:', error);
    res.status(500).json({ message: 'Error adding driver', error });
  }
});

// ✅ Get a driver by ID
app.get('/drivers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findById(id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    console.error('Error fetching driver:', error);
    res.status(500).json({ message: 'Error fetching driver', error });
  }
});

// ✅ Update a driver by ID
app.put('/drivers/:id', async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  if (updateFields.availability !== undefined) {
    updateFields.availability = (updateFields.availability === true || updateFields.availability === 'true');
  }

  try {
    const driver = await Driver.findByIdAndUpdate(id, updateFields, { new: true, useFindAndModify: false });
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    console.error('Error updating driver:', error);
    res.status(500).json({ message: 'Error updating driver', error });
  }
});

// ✅ Delete a driver by ID
app.delete('/drivers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findByIdAndDelete(id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json({ message: 'Driver deleted successfully' });
  } catch (error) {
    console.error('Error deleting driver:', error);
    res.status(500).json({ message: 'Error deleting driver', error });
  }
});

/**
 * ========================
 * BUS ROUTES
 * ========================
 */

// ✅ Fetch all buses
app.get('/buses', async (req, res) => {
  try {
    const buses = await Bus.find();
    console.log('Fetched buses:', buses);
    res.json(buses);
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ message: 'Error fetching buses', error });
  }
});

// ✅ Add a new bus
app.post('/buses', async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
  } catch (error) {
    console.error('Error adding bus:', error);
    res.status(500).json({ message: 'Error adding bus', error });
  }
});

// ✅ Get a bus by ID
app.get('/buses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const bus = await Bus.findById(id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (error) {
    console.error('Error fetching bus:', error);
    res.status(500).json({ message: 'Error fetching bus', error });
  }
});

// ✅ Update a bus by ID
app.put('/buses/:id', async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  if (updateFields.availability !== undefined) {
    updateFields.availability = (updateFields.availability === true || updateFields.availability === 'true');
  }

  try {
    const bus = await Bus.findByIdAndUpdate(id, updateFields, { new: true, useFindAndModify: false });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (error) {
    console.error('Error updating bus:', error);
    res.status(500).json({ message: 'Error updating bus', error });
  }
});

// ✅ Update bus availability
app.put('/buses/:id/availability', async (req, res) => {
  try {
    const busId = req.params.id;
    const { availability } = req.body;

    const updatedBus = await Bus.findByIdAndUpdate(busId, { availability }, { new: true });
    if (!updatedBus) return res.status(404).json({ message: 'Bus not found' });
    res.json(updatedBus);
  } catch (error) {
    console.error('Error updating bus availability:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Delete a bus by ID
app.delete('/buses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const bus = await Bus.findByIdAndDelete(id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    console.error('Error deleting bus:', error);
    res.status(500).json({ message: 'Error deleting bus', error });
  }
});

/**
 * ========================
 * ML SCHEDULING ROUTE
 * ========================
 */

// POST Route for Scheduling
app.post('/schedule', async (req, res) => {
  try {
    // Fetch available drivers and buses
    const drivers = await Driver.find({ availability: true }); // ✅ Boolean true
    const buses = await Bus.find({ availability: true }); // ✅ Boolean true

    const mlProcess = spawn('python', ['ml.py']); // Python script execution

    let mlOutput = '';

    // Receive output from Python
    mlProcess.stdout.on('data', (data) => {
      mlOutput += data.toString();
    });

    // Error handling
    mlProcess.stderr.on('data', (data) => {
      console.error(`ML Error: ${data.toString()}`);
    });

    // On Python process completion
    mlProcess.on('close', (code) => {
      console.log(`ML script exited with code ${code}`);
      try {
        const result = JSON.parse(mlOutput);
        res.json(result); // Send result back to frontend
      } catch (error) {
        console.error('Error parsing ML output:', error);
        res.status(500).json({ message: 'Error parsing ML output', error: error.message });
      }
    });

    // Send drivers and buses to Python via stdin and end stdin (important)
    mlProcess.stdin.write(JSON.stringify({ drivers, buses }));
    mlProcess.stdin.end(); // ✅ Must close stdin or Python will keep waiting

  } catch (error) {
    console.error('Error running scheduling:', error);
    res.status(500).json({ message: 'Error running scheduling', error });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
