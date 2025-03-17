import React, { useState } from 'react';
import axios from 'axios';
import { Button, Spin, notification } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, UserOutlined, CarOutlined } from '@ant-design/icons';
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
                notification.success({ message: 'Scheduling complete!', icon: <CheckCircleOutlined /> });
            } else {
                notification.warning({ message: 'No scheduling data received.', icon: <ExclamationCircleOutlined /> });
            }
        } catch (error) {
            console.error('Error scheduling:', error);
            notification.error({ message: 'Error scheduling.', icon: <ExclamationCircleOutlined /> });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="scheduling-container">
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
            
            <div className="result-section">
                <h3>Assignments</h3>
                {assignments.length > 0 ? (
                    <ul>
                        {assignments.map((assignment, index) => (
                            <li key={index} className="assignment-card">
                                <UserOutlined className="icon" />
                                <div className="details">
                                    <p>Driver <strong>{assignment.driver}</strong> assigned to Bus <strong>{assignment.bus}</strong></p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No assignments to display.</p>
                )}
            </div>

            <div className="result-section">
                <h3>Unassigned Drivers</h3>
                {unassignedDrivers.length > 0 ? (
                    <ul>
                        {unassignedDrivers.map((driver, index) => (
                            <li key={index} className="unassigned-card">
                                <UserOutlined className="icon" />
                                <div className="details">
                                    <p>{driver}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>All drivers assigned.</p>
                )}
            </div>

            <div className="result-section">
                <h3>Unassigned Buses</h3>
                {unassignedBuses.length > 0 ? (
                    <ul>
                        {unassignedBuses.map((bus, index) => (
                            <li key={index} className="unassigned-card">
                                <CarOutlined className="icon" />
                                <div className="details">
                                    <p>{bus}</p>
                                </div>
                            </li>
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
