import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Html5QrcodeScanner } from 'html5-qrcode';

function SendMoneyScan() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showScanner, setShowScanner] = useState(true); // Controls showing the scanner
  const navigate = useNavigate();

  useEffect(() => {
    if (showScanner) {
      // Initialize the scanner directly with camera selection
      const scanner = new Html5QrcodeScanner('scanner', {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      scanner.render(
        (decodedText) => {
          setRecipient(decodedText); // Set recipient to the scanned UPI ID
          scanner.clear(); // Stop scanning after success
          setShowScanner(false); // Hide the scanner after successful scan
        },
        (error) => {
          console.warn('QR Scan Error:', error);
        }
      );

      return () => {
        scanner.clear(); // Ensure to clear the scanner when component unmounts
      };
    }
  }, [showScanner]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
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
      setError('');
      setAmount('');
      setMessage('');
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || 'Error sending money. Please try again.';
      setError(errorMessage);
      setSuccess('');
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard'); // Go back to dashboard if user wants to scan again or return
  };

  return (
    <div>
      <h2>Send Money by Scanning QR</h2>

      {showScanner ? (
        <div>
          <h3>Scan the recipient's QR</h3>
          <div id="scanner" style={{ width: '300px' }}></div>
        </div>
      ) : (
        <div>
          <h3>Recipient: {recipient}</h3>
          <form onSubmit={handleSubmit}>
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

          <button onClick={handleGoBack}>Back to Dashboard</button>
        </div>
      )}
    </div>
  );
}

export default SendMoneyScan;
