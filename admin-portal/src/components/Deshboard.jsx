import React from 'react';
import "./Deshboard.css";
import {
    FaTh,
    FaCalendarAlt,
    FaUserAlt,
    FaTruck,
    FaClipboardList,
    FaSignOutAlt,
    FaCog,
    FaBell,
    FaPlus
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'antd';

const Dashboard = ({ children }) => {
    const menuItem = [
        { path: "/", name: "Dashboard", icon: <FaTh /> },
        { path: "/schedule", name: "Schedule", icon: <FaCalendarAlt /> },
        { path: "/drivers", name: "Driver", icon: <FaUserAlt /> },
        { path: "/buses", name: "Vehicles", icon: <FaTruck /> },
        { path: "/reports", name: "Reports", icon: <FaClipboardList /> }, // Correct path
        { path: "/settings", name: "Settings", icon: <FaCog /> }, // Correct path
        { path: "/add", name: "Add Driver", icon: <FaPlus /> },
        { path: "/bus", name: "Add Bus", icon: <FaPlus /> }
    ];

    return (
        <div className="container">
            <div className="sidebar">
                <div className="user_section">
                    <FaUserAlt className="user_icon" />
                    <h2 className="user_name">Admin</h2>
                    <FaBell className="notification_icon" />
                </div>
                {menuItem.map((item, index) => (
                    <Tooltip title={item.name} placement="right" key={index}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => (isActive ? "link active" : "link")}
                            end={item.path === "/"} // Make exact match for Dashboard '/'
                        >
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                        </NavLink>
                    </Tooltip>
                ))}
                <div className="bottom_section">
                    <NavLink to="/logout" className="link" activeclassname="active">
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
