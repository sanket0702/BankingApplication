// src/components/OtpVerification.js
import React from 'react';

function OtpVerification({ otp, setOtp, onVerify, onResend }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">Enter the OTP sent to your email</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-3 mb-4 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500"
        />
        <button
          onClick={onVerify}
          className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-3 rounded-lg shadow-md mb-3 transition duration-300"
        >
          Verify OTP
        </button>
        <button
          onClick={onResend}
          className="w-full text-red-600 hover:text-red-800 font-medium transition duration-200 underline"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}

export default OtpVerification;