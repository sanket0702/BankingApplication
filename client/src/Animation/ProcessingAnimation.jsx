// src/components/ProcessingAnimation.jsx
import React from 'react';

function ProcessingAnimation({ text = 'Processing Payment...' }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <div className="spinner" />
      <p>{text}</p>
      <style>{`
        .spinner {
          border: 6px solid #ccc;
          border-top: 6px solid #4caf50;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default ProcessingAnimation;
