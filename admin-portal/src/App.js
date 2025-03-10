import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Deshboard from './components/Deshboard'; // Sidebar layout
import DriverList from './components/DriverList';
import EditDriver from './components/EditDriver';
import DriverForm from './components/DriverForm';
import BusForm from './components/BusForm';
import Scheduling from './components/Scheduling';
import BusList from './components/BusList';

// Dummy components for Reports and Settings
const Reports = () => <div>Reports Page</div>;
const Settings = () => <div>Settings Page</div>;

const App = () => {
    return (
        <Router>
            <Deshboard>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<div>Dashboard Home</div>} /> {/* Dashboard home */}
                        <Route path="/drivers" element={<DriverList />} />
                        <Route path="/add" element={<DriverForm />} />
                        <Route path="/edit/:id" element={<EditDriver />} />
                        <Route path="/bus" element={<BusForm />} />
                        <Route path="/schedule" element={<Scheduling />} />
                        <Route path="/buses" element={<BusList />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </Deshboard>
        </Router>
    );
};

export default App;
