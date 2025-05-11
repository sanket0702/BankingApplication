import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional: install Lucide icons
import Logo from "../assets/logo.svg"
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <Link to="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
            <Link to="/transactions" className="hover:text-yellow-300 transition">Transactions</Link>
            <Link to="/send-money" className="hover:text-yellow-300 transition">Send Money</Link>
            <button onClick={handleLogout}  className="hover:text-yellow-300 transition">Logout</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-white font-medium bg-gradient-to-r from-red-600 to-red-900">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Dashboard</Link>
          <Link to="/transactions" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Transactions</Link>
          <Link to="/send-money" onClick={() => setMenuOpen(false)} className="block hover:text-yellow-300">Send Money</Link>
          <button   onClick={handleLogout} className="block hover:text-yellow-300">Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
