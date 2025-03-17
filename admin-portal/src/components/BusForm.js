import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Grid, Paper, Slider } from '@mui/material';
import axios from 'axios';
import './BusForm.css'; // Importing CSS file

const BusForm = () => {
    const [number, setNumber] = useState('');
    const [shift, setShift] = useState('');
    const [region, setRegion] = useState('');
    const [routeDifficulty, setRouteDifficulty] = useState(1);
    const [start, setStart] = useState('');
    const [destination, setDestination] = useState('');
    const [totalStops, setTotalStops] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/buses', {
                number,
                shift,
                region,
                routeDifficulty,
                start,
                destination,
                totalStops,
            });
            alert('Bus added successfully!');
            setNumber('');
            setShift('');
            setRegion('');
            setRouteDifficulty(1);
            setStart('');
            setDestination('');
            setTotalStops('');
        } catch (error) {
            console.error('Error adding bus:', error);
            alert('Failed to add bus.');
        }
    };

    return (
        <Container className="bus-form-container">
            <Typography variant="h4" gutterBottom className="form-title">Add New Bus</Typography>
            <Paper className="bus-form-paper" elevation={3}>
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
                            <TextField
                                label="Start Location"
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Total Stops"
                                type="number"
                                value={totalStops}
                                onChange={(e) => setTotalStops(e.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography gutterBottom className="slider-label">
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
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" className="submit-btn">
                                Add Bus
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default BusForm;
