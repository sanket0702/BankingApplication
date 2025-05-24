import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional: install Lucide icons
import axios from "axios"


///////////////
import Logo from "../../assets/logo.svg"
import AvatarMenu from './Avatar';


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
const [currentImage, setCurrentImage] = useState('');
  
  
  const token = localStorage.getItem('token');

  // Fetch current user image
  useEffect(() => {
  let isMounted = true;
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/image/profile-image`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (isMounted) {
        setCurrentImage(res.data.image?.url);
        console.log(res)
      }
    } catch {
      if (isMounted) alert('Error loading profile image');
    }
  };
  fetchProfile();

  return () => {
    isMounted = false;
  };
}, [token]);




   
 

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className="bg-gradient-to-r from-red-500 to-red-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="text-white font-bold "><img className='h-16' src={Logo}/></div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-white font-medium">
           
            

           <AvatarMenu image={currentImage}/>

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
              
              <AvatarMenu image={currentImage}/>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu 
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-white font-medium bg-gradient-to-r from-red-600 to-red-900">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Dashboard</Link>
          <Link to="/transactions" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Transactions</Link>
          <Link to="/send-money" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Send Money</Link>
          <button   onClick={handleLogout} className="block hover:text-yellow-300">Logout</button>
        </div>
      )}*/}
    </nav>
  );
}

export default Navbar;
