import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Alert, Box, MenuItem } from '@mui/material';
import axios from 'axios';
import './DriverForm.css';

const DriverForm = () => {
    const [driver, setDriver] = useState({
        name: '',
        license: '',
        password: '',
        experience: '', // Experience field
        preferredShift: '', // Preferred shift field
        region: '', // Region field
        numberOfRoutesCovered: '', // Number of routes covered
        hoursDriven: '', // Hours driven
        numberOfStops: '', // Number of stops
        availability: 'Available', // Availability field (default to "Available")
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDriver((prevDriver) => ({
            ...prevDriver,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/drivers', driver);
            alert('Driver added successfully');
        } catch (error) {
            setError('Error adding driver');
        }
    };

    return (
        <Container className="driver-form-container">
            <Typography variant="h4" gutterBottom>Add Driver</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={driver.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="License"
                    name="license"
                    value={driver.license}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={driver.password}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Experience"
                    name="experience"
                    value={driver.experience}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    select
                    label="Preferred Shift"
                    name="preferredShift"
                    value={driver.preferredShift}
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value="Morning">Morning</MenuItem>
                    <MenuItem value="Afternoon">Afternoon</MenuItem>
                    <MenuItem value="Evening">Evening</MenuItem>
                </TextField>
                <TextField
                    select
                    label="Region"
                    name="region"
                    value={driver.region}
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value="North">North</MenuItem>
                    <MenuItem value="East">East</MenuItem>
                    <MenuItem value="West">West</MenuItem>
                    <MenuItem value="South">South</MenuItem>
                </TextField>
                <TextField
                    label="Number of Routes Covered"
                    name="numberOfRoutesCovered"
                    value={driver.numberOfRoutesCovered}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Hours Driven"
                    name="hoursDriven"
                    value={driver.hoursDriven}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Number of Stops"
                    name="numberOfStops"
                    value={driver.numberOfStops}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    select
                    label="Availability"
                    name="availability"
                    value={driver.availability}
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Not Available">Not Available</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" color="primary">Add Driver</Button>
            </Box>
        </Container>
    );
};

export default DriverForm;
