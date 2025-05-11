import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SendMoneyPage from './pages/SendMoneyPage';
import SendMoneyScan from './pages/SendMoneyScan';
import ProtectedRoute from './components/ProtectedRoutes';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import Navbar from './components/Navbar';
import ResetPassword from './pages/ResetPassword'
import "./App.css"
function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <>
        <Navbar />
        <Outlet />
      </>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Protected Layout with Navbar */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/send-money" element={<SendMoneyPage />} />
          <Route path="/send-money-qr" element={<SendMoneyScan />} />
          <Route path="/transactions/history" element={<TransactionHistoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
