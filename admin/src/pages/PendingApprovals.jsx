// src/pages/PendingApprovals.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PendingApprovals = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const token = localStorage.getItem('token');

  const fetchPendingUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/pending-approvals`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPendingUsers(res.data);
    } catch (error) {
      console.error('Error fetching pending approvals:', error);
    }
  };

  const approveUser = async (accountNumber) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/approve`,
        { accountNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPendingUsers();
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const rejectUser = async (accountNumber) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/reject`,
        {
          data: { accountNumber },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPendingUsers();
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const toggleExpand = (userId) => {
    setExpandedUserId(prev => (prev === userId ? null : userId));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Pending User Approvals</h2>
      {pendingUsers.length === 0 ? (
        <p className="text-gray-500">No pending users to approve.</p>
      ) : (
        <div className="space-y-4">
          {pendingUsers.map((user) => (
            <div
              key={user._id}
              className="border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
            >
              <div
                className="flex justify-between items-center px-4 py-3 cursor-pointer"
                onClick={() => toggleExpand(user._id)}
              >
                <div>
                  <p className="font-semibold">{user.fullName} ({user.accountNumber})</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                {expandedUserId === user._id ? <ChevronUp /> : <ChevronDown />}
              </div>

              {expandedUserId === user._id && (
                <div className="bg-white px-6 py-4 border-t text-sm">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Gender:</strong> {user.gender}</p>
                  <p><strong>Date of Birth:</strong> {user.dob}</p>
                  <p><strong>Address:</strong> {user.address}</p>
                  <p><strong>City:</strong> {user.city}</p>
                  <p><strong>State:</strong> {user.state}</p>
                  <p><strong>Pincode:</strong> {user.pincode}</p>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => approveUser(user.accountNumber)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectUser(user.accountNumber)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;
