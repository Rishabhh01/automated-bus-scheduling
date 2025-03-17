import React from 'react';
import './Deshboard.css';
import { FaTh, FaCalendarAlt, FaUserTie, FaBus, FaChartBar, FaSignOutAlt, FaCog, FaPlusCircle } from 'react-icons/fa';
import { IoPersonCircleSharp } from 'react-icons/io5'; // New modern admin icon
import { IoNotificationsSharp } from 'react-icons/io5'; // New modern notification icon
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'antd';

const Dashboard = ({ children }) => {
    const menuItem = [
        { path: "/", name: "Dashboard", icon: <FaTh /> },
        { path: "/schedule", name: "Schedule", icon: <FaCalendarAlt /> },
        { path: "/drivers", name: "Drivers", icon: <FaUserTie /> },
        { path: "/buses", name: "Vehicles", icon: <FaBus /> },
        { path: "/reports", name: "Reports", icon: <FaChartBar /> },
        { path: "/settings", name: "Settings", icon: <FaCog /> },
        { path: "/add", name: "Add Driver", icon: <FaPlusCircle /> },
        { path: "/bus", name: "Add Bus", icon: <FaPlusCircle /> }
    ];

    return (
        <div className="container">
            <div className="sidebar">
                <div className="user_section">
                    <IoPersonCircleSharp className="admin_icon" />
                    <h2 className="user_name">Admin Panel</h2>
                    <IoNotificationsSharp className="notification_icon" />
                </div>
                <div className="menu_section">
                    {menuItem.map((item, index) => (
                        <Tooltip title={item.name} placement="right" key={index}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => (isActive ? "link active" : "link")}
                                end={item.path === "/"}
                            >
                                <div className="icon">{item.icon}</div>
                                <div className="link_text">{item.name}</div>
                            </NavLink>
                        </Tooltip>
                    ))}
                </div>
                <div className="bottom_section">
                    <NavLink to="/logout" className="link">
                        <FaSignOutAlt className="logout_icon" />
                        <div className="link_text">Logout</div>
                    </NavLink>
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Dashboard;
