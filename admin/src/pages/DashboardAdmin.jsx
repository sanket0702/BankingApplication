// src/pages/Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const [accountNumber, setAccountNumber] = useState('');
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/search?accountNumber=${accountNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
    } catch (err) {
      alert('User not found');
      setUser(null);
    }
  };

  const deposit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/deposit`,
        { accountNumber, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Amount Deposited Successfully');
      fetchUser(); // refresh user balance
      setAmount('');
    } catch (err) {
      alert('Deposit Failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white mt-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Search Account & Deposit</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="flex-grow px-4 py-2 border rounded-md"
        />
        <button
          onClick={fetchUser}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Search
        </button>
      </div>

      {user && (
        <div className="p-4 border border-red-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Account Details</h3>
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Balance:</strong> ₹{user.balance}</p>

          <div className="mt-4 flex gap-4 items-center">
            <input
              type="number"
              placeholder="Enter Deposit Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="px-4 py-2 border rounded-md"
            />
            <button
              onClick={deposit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Deposit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;