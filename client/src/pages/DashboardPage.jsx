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
