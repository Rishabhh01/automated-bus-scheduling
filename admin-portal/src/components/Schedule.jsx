import React, { useState } from 'react';
import axios from 'axios';
import { Button, Spin, notification } from 'antd';
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
                console.log('Assignments:', response.data.assignments);
                console.log('Unassigned Drivers:', response.data.unassigned_drivers);
                console.log('Unassigned Buses:', response.data.unassigned_buses);
                setAssignments(response.data.assignments);
                setUnassignedDrivers(response.data.unassigned_drivers);
                setUnassignedBuses(response.data.unassigned_buses);
                notification.success({ message: 'Scheduling complete!' });
            } else {
                console.warn('No scheduling data received.');
                notification.warning({ message: 'No scheduling data received.' });
            }
        } catch (error) {
            console.error('Error scheduling:', error);
            console.log('Error details:', error.response ? error.response.data : error.message);
            notification.error({ message: 'Error scheduling.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="scheduling-form">
            <h2>Schedule Buses</h2>
            <Button
                type="primary"
                onClick={handleSchedule}
                loading={loading}
            >
                Schedule
            </Button>
            {loading && <Spin style={{ marginTop: '16px' }} />}
            <div style={{ marginTop: '16px' }}>
                <h3>Assignments</h3>
                {assignments.length > 0 ? (
                    <ul>
                        {assignments.map((assignment, index) => (
                            <li key={index}>
                                Driver {assignment.driver} assigned to Bus {assignment.bus}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No assignments to display.</p>
                )}
            </div>
            <div style={{ marginTop: '16px' }}>
                <h3>Unassigned Drivers</h3>
                {unassignedDrivers.length > 0 ? (
                    <ul>
                        {unassignedDrivers.map((driver, index) => (
                            <li key={index}>{driver}</li>
                        ))}
                    </ul>
                ) : (
                    <p>All drivers assigned.</p>
                )}
            </div>
            <div style={{ marginTop: '16px' }}>
                <h3>Unassigned Buses</h3>
                {unassignedBuses.length > 0 ? (
                    <ul>
                        {unassignedBuses.map((bus, index) => (
                            <li key={index}>{bus}</li>
                        ))}
                    </ul>
                ) : (
                    <p>All buses assigned.</p>
                )}
            </div>
        </div>
    );
};

export default Scheduling;
