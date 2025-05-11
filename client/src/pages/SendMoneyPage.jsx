import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProcessingAnimation2 from '../Animation/PaymentProcessing.jsx/Animation';
import SuccessAnimation from '../Animation/SuccessAnimation';

function SendMoney() {
 const navigate=useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
    const [paymentDone, setPaymentDone] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipient || !amount || isNaN(amount) || amount <= 0) {
      setError('Please provide valid recipient and amount.');
      return;
    }

    try {
      const userToken = localStorage.getItem('token'); // Assuming JWT is stored in localStorage
      if (!userToken) {
        setError('You must be logged in to send money.');
        setIsProcessing(false);
        return;
      }
      setIsProcessing(true);
    setError('');
    setSuccess('');

      const transactionData = {
        recipient,
        amount,
        message,
      };

      // Send money API request
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/transaction/send-money`,
        transactionData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Send JWT in Authorization header
          },
        }
      );
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentDone(true);
        setSuccess('Transaction successful!');
        setAmount('');
        setMessage('');
      }, 1500);
    } catch (err) {
        const errorMessage =
    err.response?.data?.error || 'Error sending money. Please try again.';
      setError(errorMessage);
      setSuccess('');
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
   <div className="min-h-screen bg-gradient-to-b from-red-100 via-red-200 to-red-300 flex items-center justify-center px-4">

      {isProcessing ? (
        <div className="centered">
          <ProcessingAnimation2 />
        </div>
      ) : paymentDone ? (
        <div className="centered">
          <SuccessAnimation />
          <button className="btn primary bg-gradient-to-r from-red-500 to-red-800" onClick={handleGoBack}>
            Back to Dashboard
          </button>
        </div>
      ) :(<div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">Send Money</h2>
  
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipient */}
        <div>
          <label className="block text-red-800 font-medium mb-1">
            Recipient (Account Number or UPI ID)
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter recipient's details"
            className="w-full p-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
  
        {/* Amount */}
        <div>
          <label className="block text-red-800 font-medium mb-1">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
  
        {/* Message */}
        <div>
          <label className="block text-red-800 font-medium mb-1">Message (Optional)</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message (optional)"
            className="w-full p-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-md hover:from-red-600 hover:to-red-800 transition"
        >
          Send Money
        </button>
      </form>
  
      {/* Status Messages */}
      {error && <p className="text-red-700 mt-4 text-sm text-center">{error}</p>}
      {success && <p className="text-green-600 mt-4 text-sm text-center">{success}</p>}
    </div>)}
    
  </div>
  
  
  );
}

export default SendMoney;
