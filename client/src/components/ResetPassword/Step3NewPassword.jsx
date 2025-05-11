// src/components/NewPasswordInput.js
import React, { useState } from 'react';

function NewPasswordInput({ newPassword, setNewPassword, onReset }) {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Set a New Password
        </h2>

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 mb-3"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setTouched(true);
          }}
          placeholder="Confirm new password"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
        />

        {touched && !passwordsMatch && (
          <p className="text-sm text-red-500 mb-2">Passwords do not match</p>
        )}

        <button
          onClick={onReset}
          disabled={!passwordsMatch}
          className={`w-full font-medium py-2 rounded-xl transition duration-200 ${
            passwordsMatch
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default NewPasswordInput;
