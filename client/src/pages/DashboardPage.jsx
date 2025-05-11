import React from 'react';
import Dashboard from '../components/Dashboard';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  
    useEffect(() => {
      const fetchHistory = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/transaction/history`, {
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
      <Dashboard  />
      
      
    
    </div>
  );
}

export default DashboardPage;
