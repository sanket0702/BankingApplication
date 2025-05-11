import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 to-red-400 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">🚧</div>
          <h1 className="text-5xl font-extrabold text-red-600 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">We’re Working On It</h2>
          <p className="text-gray-600">
            The page you’re trying to reach is either missing or under development.
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
