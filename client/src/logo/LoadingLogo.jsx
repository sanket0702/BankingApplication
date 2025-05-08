import React from "react";
import { motion } from "framer-motion";

const BankingLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-white to-gray-200">
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
          boxShadow: [
            "0 0 5px rgba(255,0,0,0.2)",
            "0 0 15px rgba(255,0,0,0.4)",
            "0 0 25px rgba(255,0,0,0.2)",
            "0 0 5px rgba(255,0,0,0.2)",
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="bg-white/50 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-red-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="120"
          height="120"
        >
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="100%" stopColor="#990000" />
            </linearGradient>
          </defs>
          <g fill="url(#redGradient)">
            <polygon points="32,4 2,20 4,24 60,24 62,20 32,4" />
            <rect x="10" y="26" width="4" height="30" rx="1" />
            <rect x="20" y="26" width="4" height="30" rx="1" />
            <rect x="30" y="26" width="4" height="30" rx="1" />
            <rect x="40" y="26" width="4" height="30" rx="1" />
            <rect x="50" y="26" width="4" height="30" rx="1" />
            <rect x="6" y="56" width="52" height="4" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

export default BankingLoader;
