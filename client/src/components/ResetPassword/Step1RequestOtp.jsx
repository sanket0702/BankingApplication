import React from 'react';
import { useNavigate } from 'react-router-dom';

function AccountInput({ accountNumber, setAccountNumber, onSubmit }) {
    const navigate=useNavigate();

    const handleLogin=()=>{
    navigate('/');
  }
  return (
     <div className=" w-full flex items-center justify-center bg-gradient-to-br p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">Enter Your Account Number</h2>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="14-digit Account Number"
          className="w-full px-4 py-3 mb-4 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500"
        />
        <button
          onClick={onSubmit}
          className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
        >
          Send OTP to Registered Email
        </button>
        <div className="flex w-full  justify-center  text-sm">
             <button className="flex w-full text-red-600 justify-center  text-sm" onClick={handleLogin}>Login </button>
        </div>
       
      </div>
    </div>
  );
}

export default AccountInput;