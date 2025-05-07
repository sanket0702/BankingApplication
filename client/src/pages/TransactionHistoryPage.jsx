import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://bankingapp-1gz3.onrender.com/api/transaction/history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error('Failed to load transactions', err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((txn, i) => (
            <li key={i}>
              {txn.type.toUpperCase()} | ₹{txn.amount} | {txn.counterpartyName} | {new Date(txn.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistoryPage;
