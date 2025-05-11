// src/components/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import Step1RequestOtp from './Step1RequestOtp';
import Step2VerifyOtp from './Step2VerifyOtp';
import Step3NewPassword from './Step3NewPassword';

function ResetPassword() {
  const [step, setStep] = useState(1);
  const [accountNumber, setAccountNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleAccountSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reset-password/request`, { accountNumber });
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || 'Error sending OTP');
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reset-password/resend`, { accountNumber });
      alert('OTP resent successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Error resending OTP');
    }
  };

  const handleOtpVerify = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reset-password/verify`, { accountNumber, otp });
      setStep(3);
    } catch (error) {
      alert(error.response?.data?.message || 'Invalid OTP');
    }
  };

  const handlePasswordReset = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reset-password/set`, { accountNumber, newPassword });
      alert('Password updated successfully');
      setStep(1);
      setAccountNumber('');
      setOtp('');
      setNewPassword('');
    } catch (error) {
      alert(error.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        {/* Bank Logo */}
        <div className="flex justify-center mb-6">
          <img src="https://img.icons8.com/?size=100&id=62765&format=png&color=000000" alt="Bank Logo" className="h-16 w-auto" />
        </div>

        {/* Step Components */}
        {step === 1 && (
          <Step1RequestOtp
            accountNumber={accountNumber}
            setAccountNumber={setAccountNumber}
            onSubmit={handleAccountSubmit}
          />
        )}
        {step === 2 && (
          <Step2VerifyOtp
            otp={otp}
            setOtp={setOtp}
            onVerify={handleOtpVerify}
            onResend={handleResendOtp}
          />
        )}
        {step === 3 && (
          <Step3NewPassword
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            onReset={handlePasswordReset}
          />
        )}
      </div>
    </div>
  );
}

export default ResetPassword;