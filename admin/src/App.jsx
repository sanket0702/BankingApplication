// src/App.js
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/DashboardAdmin';
import AdminNavbar from './components/Navbar';
import PendingApprovals from './pages/PendingApprovals';

// Protected layout wrapper
const ProtectedLayout = () => {
  const token = localStorage.getItem('token');
  return token ? (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pending-approvals" element={<PendingApprovals />} />
      </Route>
    </Routes>
  );
}

export default App;
