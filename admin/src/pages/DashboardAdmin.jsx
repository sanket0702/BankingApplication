// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [accountNumber, setAccountNumber] = useState('');
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    if (!token) navigate('/');
  }, [token, navigate]);

  const fetchUser = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/search?accountNumber=${accountNumber}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  };

  const deposit = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/admin/deposit`,
      { accountNumber, amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Amount Deposited');
    fetchUser();
  };

  const getPendingUsers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/pending-approvals`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPendingUsers(res.data);
  };

  const approveUser = async (accNo) => {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/admin/approve`,
      { accountNumber: accNo },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('User Approved');
    getPendingUsers();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Search and Deposit</h3>
      <input type="text" placeholder="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
      <button onClick={fetchUser}>Search</button>

      {user && (
        <div>
          <p>Name: {user.fullName}</p>
          <p>Balance: ₹{user.balance}</p>
          <input type="number" placeholder="Deposit Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button onClick={deposit}>Deposit</button>
        </div>
      )}

      <h3>Pending Approvals</h3>
      <button onClick={getPendingUsers}>View Unverified Users</button>
      {pendingUsers.map((u) => (
        <div key={u._id}>
          <p>{u.fullName} - {u.accountNumber}</p>
          <button onClick={() => approveUser(u.accountNumber)}>Approve</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;