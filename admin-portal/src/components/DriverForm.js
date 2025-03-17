import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Alert, Box, MenuItem, Paper } from '@mui/material';
import axios from 'axios';

const DriverForm = () => {
    const [driver, setDriver] = useState({
        name: '',
        license: '',
        password: '',
        experience: '',
        preferredShift: '',
        region: '',
        hoursDriven: '',
        age: '',
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
            alert('Driver added successfully!');
            // Clear form fields
            setDriver({
                name: '',
                license: '',
                password: '',
                experience: '',
                preferredShift: '',
                region: '',
                hoursDriven: '',
                age: '',
            });
            setError(null);
        } catch (error) {
            console.error('Error adding driver:', error);
            setError('Failed to add driver. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
                <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                    Add New Driver
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Name"
                        name="name"
                        value={driver.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="License Number"
                        name="license"
                        value={driver.license}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={driver.password}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Age"
                        name="age"
                        type="number"
                        value={driver.age}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Experience (Years)"
                        name="experience"
                        type="number"
                        value={driver.experience}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        select
                        label="Preferred Shift"
                        name="preferredShift"
                        value={driver.preferredShift}
                        onChange={handleChange}
                        fullWidth
                        required
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
                        required
                    >
                        <MenuItem value="North">North</MenuItem>
                        <MenuItem value="East">East</MenuItem>
                        <MenuItem value="West">West</MenuItem>
                        <MenuItem value="South">South</MenuItem>
                    </TextField>
                    <TextField
                        label="Hours Driven"
                        name="hoursDriven"
                        type="number"
                        value={driver.hoursDriven}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, padding: 1.2, fontWeight: 'bold', fontSize: '16px', borderRadius: 2 }}
                    >
                        Add Driver
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default DriverForm;
