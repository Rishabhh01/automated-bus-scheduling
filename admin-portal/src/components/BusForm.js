import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Grid, Paper, Slider } from '@mui/material';
import axios from 'axios';

const BusForm = () => {
    const [number, setNumber] = useState('');
    const [shift, setShift] = useState('');
    const [region, setRegion] = useState('');
    const [routeDifficulty, setRouteDifficulty] = useState(1); // New field

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/buses', {
                number,
                shift,
                region,
                routeDifficulty,
            });
            alert('Bus added successfully!');
            // Clear form fields
            setNumber('');
            setShift('');
            setRegion('');
            setRouteDifficulty(1);
        } catch (error) {
            console.error('Error adding bus:', error);
            alert('Failed to add bus.');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Add New Bus</Typography>
            <Paper style={{ padding: 16 }}>
                <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Bus Number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Shift"
                                value={shift}
                                onChange={(e) => setShift(e.target.value)}
                                fullWidth
                                required
                            >
                                <MenuItem value="Morning">Morning</MenuItem>
                                <MenuItem value="Evening">Evening</MenuItem>
                                <MenuItem value="Night">Night</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Region"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography id="route-difficulty-slider" gutterBottom>
                                Route Difficulty
                            </Typography>
                            <Slider
                                value={routeDifficulty}
                                onChange={(e, newValue) => setRouteDifficulty(newValue)}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={5}
                            />
                        </Grid>
                        <Button type="submit" variant="contained" color="primary">
                            Add Bus
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default BusForm;
