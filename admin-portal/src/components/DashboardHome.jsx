import React from 'react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { FaBus, FaUserTie, FaCalendarAlt, FaChartBar, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './DashboardHome.css';
import background3 from '../assets/images3.jpg';
import background4 from '../assets/images4.jpg';

const DashboardHome = () => {
    return (
        <Container maxWidth="lg" className="dashboard-home-container">
            {/* Welcome Section */}
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" className="welcome-section">
                <Typography variant="h2" align="center" gutterBottom className="welcome-title">
                    Welcome to the Dashboard
                </Typography>
                <Typography variant="h6" align="center" className="quote">
                    "Enhancing your travel experience every step of the way."
                </Typography>
                <Typography variant="h6" align="center" className="welcome-subtitle">
                    Your one-stop solution for managing buses, drivers, schedules, and more.
                </Typography>
                <Button variant="contained" className="cta-button">Get Started</Button>
            </Box>

            {/* Feature Cards Section */}
            <Grid
                container
                spacing={4}
                className="feature-section"
                sx={{
                    marginTop: { xs: 4, sm: 6, md: 10 },
                    paddingX: { xs: 2, sm: 4, md: 6 },
                    zIndex: 1,
                    position: 'relative',
                }}
            >
                <Grid item xs={12} sm={6} md={4}>
                    <Link to="/buses" className="feature-link">
                        <Box className="feature-card">
                            <FaBus className="feature-icon" />
                            <Typography variant="h6" className="feature-title">Manage Buses</Typography>
                            <Typography variant="body2" className="feature-description">
                                Keep track of all buses, their routes, and availability in one place.
                            </Typography>
                        </Box>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Link to="/drivers" className="feature-link">
                        <Box className="feature-card">
                            <FaUserTie className="feature-icon" />
                            <Typography variant="h6" className="feature-title">Manage Drivers</Typography>
                            <Typography variant="body2" className="feature-description">
                                Access and manage driver information effortlessly.
                            </Typography>
                        </Box>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Link to="/schedule" className="feature-link">
                        <Box className="feature-card">
                            <FaCalendarAlt className="feature-icon" />
                            <Typography variant="h6" className="feature-title">Scheduling</Typography>
                            <Typography variant="body2" className="feature-description">
                                Plan and organize schedules efficiently.
                            </Typography>
                        </Box>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Link to="/reports" className="feature-link">
                        <Box className="feature-card">
                            <FaChartBar className="feature-icon" />
                            <Typography variant="h6" className="feature-title">Reports</Typography>
                            <Typography variant="body2" className="feature-description">
                                Generate detailed reports to analyze performance.
                            </Typography>
                        </Box>
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Link to="/settings" className="feature-link">
                        <Box className="feature-card">
                            <FaCog className="feature-icon" />
                            <Typography variant="h6" className="feature-title">Settings</Typography>
                            <Typography variant="body2" className="feature-description">
                                Customize settings to suit your preferences.
                            </Typography>
                        </Box>
                    </Link>
                </Grid>
            </Grid>

            {/* Mapping Future Section */}
            <Typography variant="h4" align="center" className="section-title mapping-future">
                Mapping the Future: Visualizing Smart Transit
            </Typography>

            {/* Image Gallery Section */}
            <Box className="image-gallery-section">
                <Grid container spacing={3} className="image-gallery-grid">
                    <Grid item xs={12} sm={6} md={6}>
                        <Box className="image-card">
                            <img src={background3} alt="Feature 3" className="gallery-image" />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Box className="image-card">
                            <img src={background4} alt="Feature 4" className="gallery-image" />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default DashboardHome;
