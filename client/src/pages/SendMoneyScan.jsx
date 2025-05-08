// SendMoneyScan.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';
import ProcessingAnimation from '../Animation/ProcessingAnimation';
import SuccessAnimation from '../Animation/SuccessAnimation';
import "../styles/MoneySendScan.css"


function SendMoneyScan() {
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
const [paymentDone, setPaymentDone] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [scannerStarted, setScannerStarted] = useState(false);
  const navigate = useNavigate();

  /************ */
  useEffect(() => {
    if (paymentDone) {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 5000); // Navigate to the dashboard after 5 seconds

      return () => clearTimeout(timer); // Cleanup timer if the component is unmounted or paymentDone is changed
    }
  }, [paymentDone, navigate]);
  /*************** */

  useEffect(() => {
    const scannerId = 'qr-reader';
    let html5QrCode = new Html5Qrcode(scannerId);
    let isMounted = true;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length > 0 && isMounted) {
          const cameraId = devices[0].id;

          html5QrCode
            .start(
              cameraId,
              { fps: 10, qrbox: { width: 250, height: 250 } },
              (decodedText) => {
                console.log('QR Code Scanned:', decodedText);
                setRecipient(decodedText);
                html5QrCode.stop().then(() => {
                  html5QrCode.clear();
                  setScannerStarted(false);
                });
              },
              (err) => {
                console.warn('Scan error:', err);
              }
            )
            .then(() => {
              setScannerStarted(true);
            })
            .catch((err) => {
              console.error('Unable to start scanning:', err);
              setError('Camera access error. Please allow permissions.');
            });
        } else {
          setError('No camera found.');
        }
      })
      .catch((err) => {
        console.error('Error accessing cameras:', err);
        setError('Camera access denied or unavailable.');
      });

    return () => {
      isMounted = false;
      if (scannerStarted) {
        html5QrCode
          .stop()
          .then(() => html5QrCode.clear())
          .catch(() => {});
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
  
    setIsProcessing(true);
    setError('');
    setSuccess('');
  
    try {
      const userToken = localStorage.getItem('token');
      if (!userToken) {
        setError('You must be logged in to send money.');
        setIsProcessing(false);
        return;
      }
  
      const transactionData = { recipient, amount, message };
  
      const response = await axios.post(
        'http://localhost:5000/api/transaction/send-money',
        transactionData,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
  
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentDone(true);
        setSuccess('Transaction successful!');
        setAmount('');
        setMessage('');
      }, 1500); // simulate processing delay
    } catch (err) {
      setIsProcessing(false);
      setError(err.response?.data?.error || 'Error sending money.');
    }
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const html5QrCode = new Html5Qrcode("qr-reader");
  
    try {
      const result = await html5QrCode.scanFile(file, true); // true = show scan region
      console.log('QR Code from image:', result);
      setRecipient(result);
      setError('');
      setSuccess('QR code scanned from image!');
    } catch (error) {
      console.error('Image scan error:', error);
      setError('Unable to scan QR code from image. Try again.');
    }
  };
  

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="send-money-container">
  

  {isProcessing ? (
    <div className="centered">
      <ProcessingAnimation />
    </div>
  ) : paymentDone ? (
    <div className="centered">
      <SuccessAnimation />
      <button className="btn primary" onClick={handleGoBack}>
        Back to Dashboard
      </button>
    </div>
  ) : !recipient ? (
    <>
    <button
      type="button"
      
      className="text-center mt-4 text-red-600 underline"
    >
      <ArrowLeft className="w-6 h-6 text-red-600" />
    </button>
    <h2 className="heading">Send Money via QR</h2>
      <p className="status-text">Scanning for QR code...</p>
      <div id="qr-reader" className="qr-reader"></div>
      <input
  type="file"
  accept="image/*"
  id="qr-file"
  onChange={handleImageUpload}
  className="file-input-hidden"
/>

<div className="w-full h-10 cursor-pointer flex justify-center" onClick={() => document.getElementById('qr-file').click()}>
  <img
    src="https://img.icons8.com/?size=100&id=8ax09IWlr80n&format=png&color=000000"
    alt="Upload QR"
    className="w-full h-full object-contain "
  />
</div>
 
      {/*{error && <p className="error-text">{error}</p>} */}
    </>
  ) : (/**** */
    <div className="flex flex-col h-[80vh] justify-between bg-gradient-to-b from-red-100 via-red-200 to-red-300">
  {/* Header */}
  <div className="flex items-center p-4 bg-white/90 backdrop-blur border-b shadow">
    
    <button
      type="button"
      
      className="text-center mt-4 text-red-600 underline"
    >
      <ArrowLeft className="w-6 h-6 text-red-600" />
    </button>
    <div className="flex-1 text-center">
      <p className="font-semibold text-red-700">Recipient: {recipient}</p>
      <p className="text-sm text-red-500">Bank</p>
    </div>
  </div>

  {/* Payment Form */}
  <form onSubmit={handleSubmit} className="flex-1 flex flex-col  px-6 py-4">
    <div className="flex flex-col items-center mt-8">
      <p className="text-sm text-red-700 mb-2">You are Paying</p>

      {/* Amount Input */}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="₹ 0"
        className="text-4xl font-bold text-center w-full max-w-xs py-2 bg-transparent border-b-2 border-red-500 focus:outline-none focus:border-red-700 mb-6 text-red-800"
      />

      {/* Message Input */}
      {showMessageInput ? (
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
          className="border border-red-400 rounded p-2 w-full max-w-xs mb-4 bg-white text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowMessageInput(true)}
          className="flex items-center text-red-600 mb-4"
        >
          <MessageSquare  className="w-4 h-4 mr-1" />
          <span>Add Message</span>
        </button>
      )}
    </div>

    {/* From Account + Submit */}
    <div className="bg-white/90 backdrop-blur p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-red-800 font-medium">From</span>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-red-500 rounded-full mr-2"></div>
          <span className="text-red-900">••••••8546</span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded font-semibold hover:from-red-600 hover:to-red-800 transition"
      >
        Send Money
      </button>

      {error && <p className="text-red-700 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
    </div>

    {/* Back Button */}
    
  </form>
</div>


    /********** */
    
  )}
</div>



  );
}

export default SendMoneyScan;
