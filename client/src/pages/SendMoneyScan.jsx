// SendMoneyScan.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BrowserMultiFormatReader } from '@zxing/browser';
import axios from 'axios';
import ProcessingAnimation from '../Animation/ProcessingAnimation';
import SuccessAnimation from '../Animation/SuccessAnimation';
import '../styles/MoneySendScan.css';
import ProcessingAnimation2 from '../Animation/PaymentProcessing.jsx/Animation';
import  Processing from "../Animation/PaymentProcessingLatest/Processing"
function SendMoneyScan() {
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    scannerRef.current = codeReader;
  
    const startScanner = async () => {
      try {
        await codeReader.decodeFromVideoDevice(
          null,
          videoRef.current,
          (result, err) => {
            if (result) {
              console.log('QR Code:', result.getText());
              setRecipient(result.getText());
  
              // Stop scanning once we get result
              codeReader.reset();  // This stops the video stream
            }
          }
        );
      } catch (error) {
        console.error("Camera error:", error);
        setError("Could not start camera or permission denied.");
      }
    };
  
    startScanner();
  
    return () => {
      // Cleanup on unmount
      try {
        codeReader.reset();
      } catch (e) {
        console.warn("Failed to reset scanner:", e);
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
        `${import.meta.env.VITE_API_BASE_URL}/api/transaction/send-money`,
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
      }, 1500);
    } catch (err) {
      setIsProcessing(false);
      setError(err.response?.data?.error || 'Error sending money.');
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const result = await scannerRef.current.decodeFromImage(file);
      setRecipient(result.getText());
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
          < Processing />
        </div>
      ) : paymentDone ? (
        <div className="centered">
          <SuccessAnimation />
          <button className="btn primary bg-gradient-to-r from-red-500 to-red-800" onClick={handleGoBack}>
            Back to Dashboard
          </button>
        </div>
      ) : !recipient ? (
        <>
          <button type="button" onClick={handleGoBack} className="text-center mt-4 text-red-600 underline">
            <ArrowLeft className="w-6 h-6 text-red-600" />
          </button>
          <h2 className="heading">Send Money via QR</h2>
          <p className="status-text">Scanning for QR code...</p>
          <video ref={videoRef} className="qr-reader" muted autoPlay playsInline></video>

          <input
            type="file"
            accept="image/*"
            id="qr-file"
            onChange={handleImageUpload}
            className="file-input-hidden"
          />

          <div
            className="w-full h-10 cursor-pointer flex justify-center"
            onClick={() => document.getElementById('qr-file').click()}
          >
            <img
              src="https://img.icons8.com/?size=100&id=8ax09IWlr80n&format=png&color=000000"
              alt="Upload QR"
              className="w-full h-full object-contain"
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col h-[80vh] justify-between bg-gradient-to-b from-red-100 via-red-200 to-red-300">
          <div className="flex items-center p-4 bg-white/90 backdrop-blur border-b shadow">
            <button onClick={handleGoBack}  type="button" className="text-center mt-4 text-red-600 underline">
              <ArrowLeft className="w-6 h-6 text-red-600" />
            </button>
            <div className="flex-1 text-center">
              <p className="font-semibold text-red-700">Recipient: {recipient}</p>
              <p className="text-sm text-red-500">Bank</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-6 py-4">
            <div className="flex flex-col items-center mt-8">
              <p className="text-sm text-red-700 mb-2">You are Paying</p>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="₹ 0"
                className="text-4xl font-bold text-center w-full max-w-xs py-2 bg-transparent border-b-2 border-red-500 focus:outline-none focus:border-red-700 mb-6 text-red-800"
              />

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
                  <MessageSquare className="w-4 h-4 mr-1" />
                  <span>Add Message</span>
                </button>
              )}
            </div>

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
          </form>
        </div>
      )}
    </div>
  );
}

export default SendMoneyScan;