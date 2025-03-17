import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Switch,
  Box,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import ShiftIcon from '@mui/icons-material/AccessTime';
import RegionIcon from '@mui/icons-material/LocationOn';
import RouteIcon from '@mui/icons-material/Route';
import StartIcon from '@mui/icons-material/PlayArrow';
import EndIcon from '@mui/icons-material/Stop';
import StopsIcon from '@mui/icons-material/PinDrop';

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
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <DirectionsBusIcon color="primary" sx={{ fontSize: 50, mr: 2 }} />
        <Typography variant="h3" fontWeight="bold" color="#333" sx={{ textShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>
          BUS LIST
        </Typography>
      </Box>
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress size={80} thickness={5} />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {!loading && !error && (
        <Grid container spacing={4}>
          {buses.map((bus) => (
            <Grid item xs={12} sm={6} md={4} key={bus._id}>
              <Card
                sx={{
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '20px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <DirectionsBusIcon color="primary" />
                    <Typography variant="h5" fontWeight="bold" color="#2d3436">
                      Bus Number: {bus.number}
                    </Typography>
                  </Stack>
                  <Stack spacing={2} mb={2}>
                    <Box display="flex" alignItems="center">
                      <ShiftIcon color="action" />
                      <Typography variant="body1" color="#636e72" ml={1}>
                        Shift: <strong>{bus.shift}</strong>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <RegionIcon color="action" />
                      <Typography variant="body1" color="#636e72" ml={1}>
                        Region: <strong>{bus.region}</strong>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <RouteIcon color="action" />
                      <Typography variant="body1" color="#636e72" ml={1}>
                        Route Difficulty: <strong>{bus.routeDifficulty}</strong>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <StartIcon color="action" />
                      <Typography variant="body1" color="#636e72" ml={1}>
                        Start: <strong>{bus.start}</strong>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <EndIcon color="action" />
                      <Typography variant="body1" color="#636e72" ml={1}>
                        End: <strong>{bus.end}</strong>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <StopsIcon color="action" />
                      <Typography variant="body1" color="#636e72" ml={1}>
                        Total Stops: <strong>{bus.totalStops}</strong>
                      </Typography>
                    </Box>
                  </Stack>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Typography
                      variant="body2"
                      color={bus.availability ? '#00b894' : '#d63031'}
                      fontWeight="bold"
                    >
                      {bus.availability ? 'Available' : 'Not Available'}
                    </Typography>
                    <Tooltip title="Change Availability" arrow>
                      <IconButton onClick={() => handleAvailabilityChange(bus._id, bus.availability)}>
                        <Switch
                          checked={bus.availability}
                          color={bus.availability ? 'success' : 'error'}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BusList;
