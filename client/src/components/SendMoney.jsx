import React, { useState } from 'react';
import axios from 'axios';

function SendMoney() {
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
        return;
      }

      const transactionData = {
        recipient,
        amount,
        message,
      };

      // Send money API request
      const response = await axios.post(
        'https://bankingapp-1gz3.onrender.com/api/transaction/send-money',
        transactionData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Send JWT in Authorization header
          },
        }
      );
      setSuccess('Transaction successful!');
      setError(response.message);
      setRecipient('');
      setAmount('');
      setMessage('');
    } catch (err) {
        const errorMessage =
    err.response?.data?.error || 'Error sending money. Please try again.';
      setError(errorMessage);
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Send Money</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipient (Account Number or UPI ID)</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter recipient's Account Number or UPI ID"
          />
        </div>
        <div>
          <label>Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label>Message (Optional)</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message (optional)"
          />
        </div>
        <button type="submit">Send Money</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default SendMoney;
