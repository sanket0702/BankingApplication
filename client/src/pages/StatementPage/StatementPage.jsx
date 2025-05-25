import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TransactionStatement = () => {
  const [transactions, setTransactions] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const statementRef = useRef();

  useEffect(() => {
  const fetchStatement = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/transactions/statement`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { user, transactions } = response.data;
      console.log('User Info:', user);
      console.log('Transactions:', transactions);

      setUserInfo(user || {});
      setTransactions(transactions || []);
    } catch (err) {
      console.error('Error fetching statement:', err);
    }
  };

  fetchStatement();
}, []);

  const downloadPDF = () => {
    const input = statementRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Bank_Transaction_Statement.pdf');
    });
  };

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      <div ref={statementRef} className="bg-white p-6 shadow-lg rounded-md">
        {/* Header Section */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Bank of NextGen</h1>
          <div className="text-sm text-gray-600">
            <p><strong>Name:</strong> {userInfo.fullName || 'John Doe'}</p>
            <p><strong>Account Number:</strong> {userInfo.accountNumber || 'XXXX-XXXX-XXXX-1234'}</p>
            <p><strong>Email:</strong> {userInfo.email || 'john@example.com'}</p>
            <p><strong>Generated On:</strong> {new Date().toLocaleString()}</p>
          </div>
        </div>

        {/* Table Section */}
        <h2 className="text-xl font-semibold mb-3">Transaction History</h2>
        <table className="min-w-full text-left text-sm border mt-4 bg-white shadow-md rounded-lg overflow-hidden">
  <thead className="bg-gray-100">
    <tr>
      <th className="py-2 px-4">Date</th>
      <th className="py-2 px-4">Description</th>
      <th className="py-2 px-4">Type</th>
      <th className="py-2 px-4">Amount</th>
      <th className="py-2 px-4">Balance</th>
    </tr>
  </thead>
  <tbody>
 {transactions.map((txn, index) => {
  const userIdStr = userInfo._id?.toString();
  const senderIdStr = txn.sender?.toString();
  const recipientIdStr = txn.recipient?.toString();

  let isCredited = false;
  let label = '';

  if (txn.type === 'deposit') {
    label = 'Cash Deposit';

    if (recipientIdStr === userIdStr) {
      isCredited = true;
    } else if (senderIdStr === userIdStr) {
      isCredited = false;
    }

  } else if (txn.type === 'withdrawal') {
    label = 'Cash Withdrawal';
    isCredited = false;

  } else if (txn.type === 'transfer') {
    if (recipientIdStr === userIdStr) {
      isCredited = true;
      label = `Received from ${txn.senderName}`;
    } else if (senderIdStr === userIdStr) {
      isCredited = false;
      label = `Sent to ${txn.receiverName}`;
    }
  }

  const formattedDate = new Date(txn.timestamp).toLocaleString();

  // Show the balance of the logged-in user only
  let userBalance = null;
  if (senderIdStr === userIdStr) {
    userBalance = txn.senderBalance?.toFixed(2);
  } else if (recipientIdStr === userIdStr) {
    userBalance = txn.receiverBalance?.toFixed(2);
  }

  return (
    <tr key={index} className="border-b hover:bg-gray-50">
      <td className="py-2 px-4">{formattedDate}</td>
      <td className="py-2 px-4">{label}</td>
      <td className={`py-2 px-4 font-semibold ${isCredited ? 'text-green-600' : 'text-red-600'}`}>
        {isCredited ? 'Credited' : 'Debited'}
      </td>
      <td className="py-2 px-4">₹ {txn.amount}</td>
      <td className="py-2 px-4">
        ₹ {userBalance ?? 'N/A'}
      </td>
    </tr>
  );
})}



  </tbody>
</table>


        {/* Footer note */}
        <p className="text-xs text-gray-500 mt-6">
          *This is a system-generated transaction statement. Please contact customer support if you notice any discrepancies.
        </p>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-6 px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
      >
        Download PDF Statement
      </button>
    </div>
  );
};

export default TransactionStatement;
