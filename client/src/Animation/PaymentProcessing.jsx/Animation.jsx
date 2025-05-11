import React from "react";
import { motion } from "framer-motion";

const ProcessingAnimation2 = () => {
  return (
    <div className="flex justify-center m-auto h-[50vh] ">
      <motion.div
        animate={{ rotate: [-15, 15, -15] }} // back-and-forth rotation
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="p-6 rounded-full shadow-lg bg-white"
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="100%" stopColor="#b30000" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="48"
            stroke="url(#redGradient)"
            strokeWidth="4"
            fill="white"
          />
          <text
            x="50%"
            y="54%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="28"
            fontWeight="bold"
            fill="url(#redGradient)"
            fontFamily="Arial"
          >
            ₹
          </text>
        </svg>
      </motion.div>
    </div>
  );
};

export default ProcessingAnimation2;
