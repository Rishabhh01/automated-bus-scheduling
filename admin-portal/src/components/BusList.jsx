import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, List, ListItem, ListItemText, CircularProgress, Alert, Switch } from '@mui/material';

const BusList = () => {
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/buses');
                setBuses(response.data);
            } catch (error) {
                setError('Error fetching buses');
                console.error('Error fetching buses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBuses();
    }, []);

    const handleAvailabilityChange = async (busId, currentAvailability) => {
        try {
            const updatedAvailability = !currentAvailability;
            await axios.put(`http://localhost:5000/buses/${busId}/availability`, { availability: updatedAvailability });
            setBuses((prevBuses) =>
                prevBuses.map((bus) =>
                    bus._id === busId ? { ...bus, availability: updatedAvailability } : bus
                )
            );
        } catch (error) {
            console.error('Error updating bus availability:', error);
            setError('Error updating bus availability');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Bus List</Typography>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {!loading && !error && (
                <Paper style={{ padding: 16 }}>
                    <List>
                        {buses.map((bus) => (
                            <ListItem key={bus._id}>
                                <ListItemText
                                    primary={`Bus Number: ${bus.number}`}
                                    secondary={`Shift: ${bus.shift}, Region: ${bus.region}, Route Difficulty: ${bus.routeDifficulty}`}
                                />
                                <Switch
                                    checked={bus.availability}
                                    onChange={() => handleAvailabilityChange(bus._id, bus.availability)}
                                    name="availability"
                                    color="primary"
                                />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </Container>
    );
};

export default BusList;
