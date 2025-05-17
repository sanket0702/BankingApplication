// src/components/AdminNavbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';

const AdminNavbar = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

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
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

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
        <button
          onClick={handleLogout}
          className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
