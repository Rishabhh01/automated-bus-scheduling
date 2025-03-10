import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Alert, Button } from '@mui/material';
import { User2, Pencil } from 'lucide-react'; // Modern icons
import './DriverList.css';

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/drivers');
                console.log('Drivers fetched:', response.data);
                const driversWithDefaults = response.data.map(driver => ({
                    ...driver,
                    availability: driver.availability !== undefined ? driver.availability : true
                }));
                setDrivers(driversWithDefaults);
            } catch (error) {
                setError('Error fetching drivers');
            } finally {
                setLoading(false);
            }
        };
        fetchDrivers();
    }, []);

    const toggleAvailability = async (driverId) => {
        try {
            const driver = drivers.find(driver => driver._id === driverId);
            if (driver) {
                const updatedDriver = { ...driver, availability: !driver.availability };

                await axios.put(`http://localhost:5000/drivers/${driverId}`, { availability: updatedDriver.availability });

                setDrivers(prevDrivers =>
                    prevDrivers.map(driver =>
                        driver._id === driverId ? updatedDriver : driver
                    )
                );
            }
        } catch (error) {
            console.error('Error toggling availability:', error);
        }
    };

    return (
        <Container className="driver-list-container">
            <Typography variant="h4" gutterBottom>Driver List</Typography>
            {loading && <CircularProgress className="loading-spinner" />}
            {error && <Alert severity="error" className="alert">{error}</Alert>}
            <List>
                {drivers.map((driver) => (
                    <ListItem key={driver._id} divider className="driver-list-item">
                        <div className="driver-info">
                            <User2 className="person-icon" size={22} />
                            <ListItemText primary={`${driver.Name || 'Name not available'} - ${driver.License || 'License not available'}`} className="list-item-text" />
                        </div>

                        <div className="driver-actions">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={driver.availability}
                                    onChange={() => toggleAvailability(driver._id)}
                                />
                                <span className="slider"></span>
                            </label>
                            <Button variant="contained" className="edit-btn" component={Link} to={`/edit/${driver._id}`}>
                                <Pencil size={16} style={{ marginRight: '5px' }} /> Edit
                            </Button>
                        </div>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default DriverList;
