import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Logo from '../../assets/logo.svg'
const TransactionStatement = () => {
  const [transactions, setTransactions] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const statementRef = useRef();

  useEffect(() => {
  const fetchStatement = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const userRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/details`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Save user data
      setUserInfo(userRes.data);

      // Log user data
      

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/transactions/statement`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { transactions } = response.data;
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
    <div className="p-4 md:p-6 font-sans bg-gray-100 min-h-screen">
  <div ref={statementRef} className="bg-white p-4 md:p-6 shadow-lg rounded-md">
    
    {/* Header Section */}
    <div className="mb-4 md:mb-6 border-b pb-4">
      <h1 className="flex items-center h-[40px] w-[110px] bg-red-600">
  <img src={Logo} alt="Bank of NextGen Logo" className="h-[35px] w-auto object-cover " />
</h1>
      <div className="text-xs md:text-sm text-gray-600 space-y-1">
        <p><strong>Name:</strong> {userInfo.fullName || 'John Doe'}</p>
        <p><strong>Account Number:</strong> {userInfo.accountNumber || 'XXXX-XXXX-XXXX-1234'}</p>
        <p><strong>Email:</strong> {userInfo.email || 'john@example.com'}</p>
        <p><strong>Generated On:</strong> {new Date().toLocaleString()}</p>
      </div>
    </div>

    {/* Table Section */}
    <h2 className="text-lg md:text-xl font-semibold mb-3">Transaction History</h2>

    {/* Scrollable Table */}
    <div className="max-h-64 overflow-y-auto">
      <table className="min-w-full text-left text-xs md:text-sm border bg-white shadow-md rounded-lg">
        <thead className="sticky top-0 bg-gray-100">
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
            let isCredited = false;

            if (txn.type === 'deposit') {
              isCredited = true;
            } else if (txn.type === 'debit') {
              isCredited = false;
            } else if (txn.type === 'credit') {
              isCredited = true;
            }

            const formattedDate = new Date(txn.timestamp).toLocaleString();

            return (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{formattedDate}</td>
                <td className="py-2 px-4">
                  {txn.message || (txn.type === 'deposit' ? 'Cash Deposit' : isCredited ? `From ${txn.senderName}` : `To ${txn.receiverName}`)}
                </td>
                <td className={`py-2 px-4 font-semibold ${isCredited ? 'text-green-600' : 'text-red-600'}`}>
                  {txn.type}
                </td>
                <td className="py-2 px-4">₹ {txn.amount}</td>
                <td className="py-2 px-4">₹ {txn.balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* Footer note */}
    <p className="text-xs text-gray-500 mt-4 md:mt-6">
      *This is a system-generated transaction statement. Please contact customer support if you notice any discrepancies.
    </p>
  </div>

  <button
    onClick={downloadPDF}
    className="mt-4 md:mt-6 px-4 md:px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 w-full md:w-auto"
  >
    Download PDF Statement
  </button>
</div>


  );
};

export default TransactionStatement;
