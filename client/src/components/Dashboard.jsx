import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import BankingLoader from '../logo/LoadingLogo';
import RecentTransactions from './RecentTransaction.jsx'
function Dashboard() {
  const [user, setUser] = useState(null);
  const [showBalance, setShowBalance] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/details`, {
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
  const handleTransactionHistory=()=>navigate('/statement');
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  if (!user) return <BankingLoader/>;

  return (
    <div className="min-h-screen bg-gray-50 p relative">
      {/* Logout Button */}
      <div className="absolute top-6 right-6">
        
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
  className="text-xl font-bold text-green-600 flex items-center gap-2"
  onClick={handleShowBalance}
>
  {showBalance ? (
    `₹${user.balance}`
  ) : (
    <>
      <img
        src="https://img.icons8.com/?size=100&id=59814&format=png&color=000000"
        alt="Show Balance"
        className="w-6 h-6"
      />
    </>
  )}
</button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
          <QuickActionCard icon="https://img.icons8.com/?size=100&id=rCigw8Fdv69u&format=png&color=000000" onClick={handleShowBalance} />
          <QuickActionCard icon="https://img.icons8.com/?size=100&id=Tm8J0mjXpQFK&format=png&color=000000" onClick={handleTransferFunds} />
          <QuickActionCard icon="https://img.icons8.com/?size=100&id=dGdONlcTaLHk&format=png&color=000000" onClick={handleTransactionHistory} />
          <QuickActionCard icon="https://img.icons8.com/?size=100&id=13019&format=png&color=000000" onClick={handleQRClick} />
          <QuickActionCard icon="https://img.icons8.com/?size=100&id=rLRqKccL7rzF&format=png&color=000000" onClick={handleScanQR} />
        </div>

        {/* Recent Transactions */}
        
      </div>
      <div className="md:p-9">
        <div className="bg-gray-100 md:p-6 mt-3 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-red-600 mb-4">Recent Transactions</h3>

            <div className=' '><RecentTransactions/>
            </div>
          
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
    className="bg-white p-2 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex justify-center items-center text-3xl"
    onClick={onClick}
  >
    <img src={icon} alt="" />
  </div>
);

export default Dashboard;
