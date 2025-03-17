import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  CircularProgress,
  Alert,
  Button,
  Box,
  Chip,
  Stack
} from '@mui/material';
import { User2, Pencil } from 'lucide-react';
import './DriverList.css';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/drivers');
        console.log('Response:', response.data); // Add this line for debugging
        const driversWithDefaults = response.data.map(driver => ({
          ...driver,
          availability: driver.availability !== undefined ? driver.availability : true
        }));
        setDrivers(driversWithDefaults);
      } catch (error) {
        console.error('Error fetching drivers:', error);
        setError('Failed to fetch drivers. Please try again later.');
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
        const updatedAvailability = !driver.availability;
        await axios.put(`http://localhost:5000/drivers/${driverId}`, { availability: updatedAvailability });

        setDrivers(prevDrivers =>
          prevDrivers.map(d =>
            d._id === driverId ? { ...d, availability: updatedAvailability } : d
          )
        );
      }
    } catch (error) {
      console.error('Error updating availability:', error);
      setError('Failed to update driver availability. Please try again.');
    }
  };

  return (
    <Container className="driver-list-container">
      <Typography variant="h4" className="driver-list-title" gutterBottom>
        Driver List
      </Typography>

      {loading && <CircularProgress className="loading-spinner" />}
      {error && <Alert severity="error" className="alert">{error}</Alert>}

      {!loading && drivers.length === 0 && (
        <Typography variant="body1" color="text.secondary" align="center">
          No drivers found.
        </Typography>
      )}

      <List>
        {drivers.map((driver) => (
          <ListItem key={driver._id} divider className="driver-list-item">
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
              <Box display="flex" alignItems="center">
                <User2 className="person-icon" size={40} />
                <Box ml={2}>
                  <Typography className="driver-name">
                    {driver.name || 'Unnamed Driver'}
                  </Typography>
                  <Typography className="driver-license">
                    License: {driver.license || 'Not Provided'}
                  </Typography>
                  <Typography className="driver-meta">
                    Shift: <b>{driver.preferredShift || 'N/A'}</b> | Region: <b>{driver.region || 'N/A'}</b>
                  </Typography>
                  <Typography className="driver-meta">
                    Experience: <b>{driver.experience || '0'} years</b>
                  </Typography>
                </Box>
              </Box>

              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  label={driver.availability ? "Available" : "Not Available"}
                  color={driver.availability ? "success" : "error"}
                  variant="filled"
                  className="availability-chip"
                />

                <label className="switch">
                  <input
                    type="checkbox"
                    checked={driver.availability}
                    onChange={() => toggleAvailability(driver._id)}
                  />
                  <span className="slider"></span>
                </label>

                <Button
                  variant="contained"
                  color="primary"
                  className="edit-btn"
                  component={Link}
                  to={`/edit/${driver._id}`}
                  startIcon={<Pencil size={16} />}
                >
                  Edit
                </Button>
              </Stack>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DriverList;

