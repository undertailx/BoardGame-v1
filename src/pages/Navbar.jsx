import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Puzzle, Target, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { 
      name: 'หน้าแรก', 
      icon: Home, 
      path: '/' 
    },
    { 
      name: 'เกมปริศนาความจำ', 
      icon: Puzzle, 
      path: '/memory-puzzle' 
    },
    { 
      name: 'เกมจับลูกบอล', 
      icon: Target, 
      path: '/CatchTheBall' 
    }
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#1a0b2e] to-[#120621] z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center h-16 space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              onClick={() => setActiveTab(item.name.toLowerCase().replace(/\s+/g, '-'))}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === item.name.toLowerCase().replace(/\s+/g, '-') 
                  ? 'bg-purple-700/50 text-white' 
                  : 'text-purple-300 hover:bg-purple-700/30 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center h-16">
          <button 
            onClick={toggleMenu} 
            className="text-purple-300 hover:text-white"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-[#1a0b2e] py-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                onClick={() => {
                  setActiveTab(item.name.toLowerCase().replace(/\s+/g, '-'));
                  toggleMenu();
                }}
                className={`flex items-center space-x-2 px-4 py-3 transition-all duration-300 ${
                  activeTab === item.name.toLowerCase().replace(/\s+/g, '-') 
                    ? 'bg-purple-700/50 text-white' 
                    : 'text-purple-300 hover:bg-purple-700/30 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
