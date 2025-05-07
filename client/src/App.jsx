import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SendMoneyPage from './pages/SendMoneyPage';
import SendMoneyScan from './components/SendMoneyScan';
import ProtectedRoute from './components/ProtectedRoutes'; // ✅ import
import TransactionHistoryPage from './pages/TransactionHistoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/send-money"
          element={
            <ProtectedRoute>
              <SendMoneyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/send-money-qr"
          element={
            <ProtectedRoute>
              <SendMoneyScan />
            </ProtectedRoute>
          }
        />

<Route
          path="/transactions/history"
          element={
            <ProtectedRoute>
              <TransactionHistoryPage/>
            </ProtectedRoute>
          }
        />
      </Routes>

      
    </Router>
  );
}

export default App;
