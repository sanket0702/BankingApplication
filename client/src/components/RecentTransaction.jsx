




import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Assuming the JWT is stored in localStorage
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/recent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className=" w-[100%] p-4">
      

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        transactions.map((txn) => (
          <div
            key={txn.transactionId}
            className="bg-white w-[100%] rounded-xl  shadow-md p-4 mb-4 transition hover:shadow-lg"
          >
            <div className="flex justify-between items-start flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <p className="font-semibold text-gray-800">
                  {txn.type === 'credit' ? 'Received from' : 'Sent to'}{' '}
                  {txn.type === 'credit' ? txn.senderName : txn.receiverName}
                </p>
                <p className="text-sm text-gray-600">
                  {txn.message || 'No message'}
                </p>
              </div>
              <div
                className={`text-lg font-bold ${
                  txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                } mt-2 sm:mt-0`}
              >
                {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-3 flex-wrap">
              <span>{new Date(txn.timestamp).toLocaleString()}</span>
              <span className="font-medium text-gray-700">
                Balance: ₹{txn.balance}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};



export default TransactionHistory;
