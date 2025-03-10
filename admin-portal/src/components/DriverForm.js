import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Alert, Box, MenuItem } from '@mui/material';
import axios from 'axios';
import './DriverForm.css';

const DriverForm = () => {
    const [driver, setDriver] = useState({
        Name: '',
        License: '',
        Password: '',
        Experience: '', // Experience field
        PreferredShift: '', // Preferred shift field
        Region: '', // Region field
        HoursDriven: '', // Hours driven
       // Availability: true, // Availability field (default to true)
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
                    name="Name"
                    value={driver.Name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="License"
                    name="License"
                    value={driver.License}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Password"
                    name="Password"
                    type="password"
                    value={driver.Password}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Experience"
                    name="Experience"
                    value={driver.Experience}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    select
                    label="Preferred Shift"
                    name="PreferredShift"
                    value={driver.PreferredShift}
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
                    name="Region"
                    value={driver.Region}
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value="North">North</MenuItem>
                    <MenuItem value="East">East</MenuItem>
                    <MenuItem value="West">West</MenuItem>
                    <MenuItem value="South">South</MenuItem>
                </TextField>
                <TextField
                    label="Hours Driven"
                    name="HoursDriven"
                    value={driver.HoursDriven}
                    onChange={handleChange}
                    fullWidth
                />
                {/* Add other fields as needed */}
                <Button type="submit" variant="contained" color="primary">
                    Add Driver
                </Button>
            </Box>
        </Container>
    );
};

export default DriverForm;
