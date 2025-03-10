import React, { useState } from 'react';
import axios from 'axios';
import { Button, Spin, notification } from 'antd';
import { FaBus, FaUser } from 'react-icons/fa';
import './Scheduling.css'; 

const Scheduling = () => {
    const [loading, setLoading] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [unassignedDrivers, setUnassignedDrivers] = useState([]);
    const [unassignedBuses, setUnassignedBuses] = useState([]);

    const handleSchedule = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/schedule');
            if (response.data && response.data.assignments) {
                setAssignments(response.data.assignments);
                setUnassignedDrivers(response.data.unassigned_drivers);
                setUnassignedBuses(response.data.unassigned_buses);
                notification.success({ message: 'Scheduling complete!' });
            } else {
                notification.warning({ message: 'No scheduling data received.' });
            }
        } catch (error) {
            console.error('Error scheduling:', error);
            notification.error({ message: 'Error scheduling.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="scheduling-container">
            <header className="header">
                <h1>Delhi Transport Corporation</h1>
                <p>Automated Bus Scheduling and Route Management System</p>
            </header>
            <main className="main-content">
                <h2>Schedule Buses</h2>
                <Button
                    type="primary"
                    onClick={handleSchedule}
                    loading={loading}
                    className="schedule-button"
                >
                    Schedule
                </Button>
                {loading && <Spin style={{ marginTop: '16px' }} />}
                <section className="assignments-section">
                    <h3>Assignments</h3>
                    {assignments.length > 0 ? (
                        assignments.map((assignment, index) => (
                            <div key={index} className="assignment-card">
                                <FaBus className="icon" />
                                <div className="details">
                                    <p><span>Driver:</span> {assignment.driver}</p>
                                    <p><span>Bus:</span> {assignment.bus}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No assignments to display.</p>
                    )}
                </section>
                <section className="unassigned-section">
                    <h3>Unassigned Drivers</h3>
                    {unassignedDrivers.length > 0 ? (
                        unassignedDrivers.map((driver, index) => (
                            <div key={index} className="unassigned-card">
                                <FaUser className="icon" />
                                <div className="details">
                                    <p>{driver}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>All drivers assigned.</p>
                    )}
                </section>
                <section className="unassigned-section">
                    <h3>Unassigned Buses</h3>
                    {unassignedBuses.length > 0 ? (
                        unassignedBuses.map((bus, index) => (
                            <div key={index} className="unassigned-card">
                                <FaBus className="icon" />
                                <div className="details">
                                    <p>{bus}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>All buses assigned.</p>
                    )}
                </section>
            </main>
            <footer className="footer">
                <p>© 2025 Delhi Transport Corporation. All rights reserved.</p>
                <p>Contact us at <a href="mailto:support@dtc.gov">support@dtc.gov</a></p>
            </footer>
        </div>
    );
};

export default Scheduling;
