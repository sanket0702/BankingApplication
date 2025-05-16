// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/DashboardAdmin';
import AdminNavbar from './components/Navbar';
import PendingApprovals from './pages/PendingApprovals';
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};



function App() {
  return (
    <div>
      <ProtectedRoute>
            <AdminNavbar/>
          </ProtectedRoute>
    <Routes>
      
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route path="/pending-approvals" element={<ProtectedRoute><PendingApprovals /></ProtectedRoute>} />

      
    </Routes>
    </div>
  );
}

export default App;