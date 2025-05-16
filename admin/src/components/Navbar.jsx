// src/components/AdminNavbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

const AdminNavbar = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/pending-approvals`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPendingCount(data.length);
      } catch (error) {
        console.error('Error fetching pending count:', error);
      }
    };

    fetchCount();
  }, []);

  return (
    <nav className="bg-red-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="flex items-center gap-6">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/pending-approvals" className="relative">
          <Bell />
          {pendingCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
