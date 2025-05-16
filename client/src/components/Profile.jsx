import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UploadCloud } from "lucide-react";

export default function Profile() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [current, setCurrent] = useState('');
  const [user,setUser]=useState('');


   const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchImage = async () => {
     
      const imageRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/image/profile-image`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrent(imageRes.data.image.url);


      const userRes = await  axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/details`,{
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(userRes.data);
      console.log(userRes);
    };



    fetchImage();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', image);
    const token = localStorage.getItem('token');

    const res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/image/profile-image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    
    setCurrent(res.data.image.url);
    setImage(null);
    setPreview('');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-white via-red-50 to-red-100 rounded-2xl shadow-lg mt-8 border border-red-300">
  <h2 className="text-4xl font-extrabold text-red-600 mb-8 text-center tracking-wide"> Banking Profile</h2>

  {/* Profile Picture & Upload */}
  <div className="flex flex-col items-center mb-10">
    <div className="relative w-40 h-40">
      <img
        src={current||preview}
        alt="Profile"
        className="w-full h-full object-cover rounded-full border-4 border-red-500 shadow-md"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="absolute bottom-0 right-0 w-12 h-12 rounded-full border-2 border-white shadow-md"
        />
      )}
    </div>

    <div className="mt-4 flex flex-col items-center gap-2">
     <div className="relative">
  <input
    id="fileUpload"
    type="file"
    onChange={handleImageChange}
    className="hidden"
  />
  <label
    htmlFor="fileUpload"
    className="inline-block cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full shadow-md transition duration-300"
  >
    <UploadCloud/>
  </label>
</div>
      <button
        onClick={uploadImage}
        disabled={!image}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-full disabled:opacity-50 shadow-md transition duration-300"
      >
        Upload New Image
      </button>
    </div>
  </div>

  {/* User Information */}
  {user && (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 px-4">
      {[
        ['Full Name', user.fullName],
        ['Date of Birth', new Date(user.dateOfBirth).toLocaleDateString()],
        ['Gender', user.gender],
        ['Address', user.address],
        ['Phone', user.phone],
        ['Email', user.email],
        ['Occupation', user.occupation],
        ['Nationality', user.nationality],
        ['Marital Status', user.maritalStatus],
        ['Nominee', user.nominee],
        ['Account Number', <span className="font-mono">{user.accountNumber}</span>],
        ['UPI ID', user.upiId],
       
      ].map(([label, value], index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-200"
        >
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-lg font-semibold text-red-700">{value}</p>
        </div>
      ))}
    </div>
  )}
</div>

  );
}
