import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, ShieldAlert } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-[#1f1f1f] shadow-sm py-4 transition-colors duration-300">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-2xl tracking-tighter">
          <ShieldAlert size={28} className="text-primary"/>
          <span>SheRaksha</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary transition font-medium">Home</Link>
          <Link to="/saferoutes" className="text-gray-600 dark:text-gray-300 hover:text-primary transition font-medium">Safe Routes</Link>
          <Link to="/complaints" className="text-gray-600 dark:text-gray-300 hover:text-primary transition font-medium">Complaints</Link>
          <Link to="/schemes" className="text-gray-600 dark:text-gray-300 hover:text-primary transition font-medium">Schemes</Link>
          <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary transition font-medium">Dashboard</Link>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-600 dark:text-gray-300"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <Link to="/login" className="bg-primary hover:bg-pink-600 text-white px-5 py-2 rounded-full font-medium transition shadow-md shadow-primary/20">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
