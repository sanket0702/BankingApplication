import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';

function Dashboard({transaction}) {
  const [user, setUser] = useState(null);
  const [showBalance, setShowBalance] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const navigate = useNavigate();

  const recentTransactions = [
    { id: 1, date: "2025-05-06", description: "Transferred to Jane Doe", amount: "-₹2000" },
    { id: 2, date: "2025-05-04", description: "Deposited from Salary", amount: "+₹50,000" },
    { id: 3, date: "2025-05-02", description: "Electricity Bill Payment", amount: "-₹1500" }
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await axios.get('http://localhost:5000/api/user/details', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user details');
      }
    };
    fetchUserDetails();
  }, []);

  const handleShowBalance = () => setShowBalance(!showBalance);
  const handleQRClick = () => setShowQRCode(true);
  const handleTransferFunds = () => navigate('/send-money');
  const handleScanQR = () => navigate('/send-money-qr');
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      {/* Logout Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Welcome Header */}
        <h1 className="text-3xl font-bold text-red-600 mb-4">Welcome back, {user.fullName} 👋</h1>
        <p className="text-gray-600 mb-8">Here’s an overview of your account and quick actions.</p>

        {/* Account Overview */}
        <div className="mb-8 bg-gray-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-red-600">Account Overview</h3>
          <p><strong>Account Number:</strong> {user.accountNumber}</p>
            <p><strong>UPI ID:</strong> {user.upiId}</p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg text-gray-700">Current Balance</p>
            <button 
              className="text-xl font-bold text-green-600"
              onClick={handleShowBalance}
            >
              {showBalance ? `₹${user.balance}` : "Click to view balance"}
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
          <QuickActionCard icon="💵" onClick={handleShowBalance} />
          <QuickActionCard icon="💸" onClick={handleTransferFunds} />
          <QuickActionCard icon="🧾" />
          <QuickActionCard icon="📲" onClick={handleQRClick} />
          <QuickActionCard icon="📷" onClick={handleScanQR} />
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-red-600 mb-4">Recent Transactions</h3>


          <ul className="space-y-4">
          {transaction.map((txn, index) => {
  const isCredit = txn.receiverUpi === user.upiId;
  const formattedDate = new Date(txn.timestamp).toLocaleString();
  const amountText = `${isCredit ? '+' : '-'}₹${txn.amount}`;

  return (
    <li key={txn._id || index} className="flex justify-between items-center">
      <div>
        <p className="text-gray-700 font-semibold">
          {isCredit ? `CREDITED FROM ${txn.senderName}` : `DEBITED TO ${txn.receiverName}`}
        </p>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
      <p className={`font-medium ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
        {amountText}
      </p>
    </li>
    );
  })}
</ul>
        </div>
      </div>

      {/* QR Code Pop-up */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-xl font-semibold text-red-600 mb-4">Your UPI QR Code</h3>
            <div className="flex justify-center mb-4">
              <QRCode value={user.upiId} />
            </div>
            <button
              onClick={() => setShowQRCode(false)}
              className="bg-red-600 text-white py-2 px-4 rounded-xl w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const QuickActionCard = ({ icon, onClick }) => (
  <div
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex justify-center items-center text-3xl"
    onClick={onClick}
  >
    {icon}
  </div>
);

export default Dashboard;
