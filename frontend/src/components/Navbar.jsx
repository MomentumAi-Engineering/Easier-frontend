import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome, FiAlertCircle, FiList, FiInfo, FiMail, FiHelpCircle,
  FiCode, FiBook, FiUser, FiMenu, FiX, FiBell, FiCpu, FiZap,
  FiStar, FiSettings, FiLogOut
} from 'react-icons/fi';


import logo from '../assets/logo.png';
import logoname from '../assets/logoname.png';

function Navbar() {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <FiHome className="h-5 w-5" /> },
    { path: '/report', label: 'Report Issue', icon: <FiAlertCircle className="h-5 w-5" />, highlight: true },
    { path: '/view', label: 'My Issues', icon: <FiList className="h-5 w-5" /> },
  ];

  const userMenuItems = [
    { path: '/profile', label: 'My Profile', icon: <FiUser /> },
    { path: '/settings', label: 'Settings', icon: <FiSettings /> },
    // { path: '/billing', label: 'Billing' },
    { path: '/logout', label: 'Logout', icon: <FiLogOut /> },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 z-[1000] shadow-2xl">
        <div className="flex items-center justify-between h-full px-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline decoration-none hover:no-underline">
  <img src={logo} alt="Logo Icon" className="h-8" />
   <span className="text-xl font-semibold text-white">EaiserAi</span>
</Link>

          {/* Links */}
          <ul className="flex items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center px-4 py-2 mt-3 text-white text-sm font-medium rounded-md transition-all duration-300
                    ${location.pathname === link.path
                      ? 'bg-indigo-500/20'
                      : 'hover:bg-indigo-500/10'
                    }`}
                  style={{ textDecoration: 'none' }}
                >
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-[2px]">
            {/* Notifications */}
            <div className="relative">
              <button
                className="p-2 rounded-md hover:bg-slate-700 transition"
                onClick={() => toggleDropdown('notifications')}
              >
                <FiBell className="text-white text-xl" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-1.5 rounded-full">
                    {notifications}
                  </span>
                )}
              </button>
              {activeDropdown === 'notifications' && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-2 border-b border-slate-700">
                    <h3 className="text-white text-sm font-semibold">Notifications</h3>
                    <button className="text-indigo-300 text-xs hover:text-indigo-500">
                      Mark all as read
                    </button>
                  </div>
                  <div>
                    <div className="px-4 py-2 border-b border-slate-700 hover:bg-slate-700">
                      <p className="text-white text-sm">Your issue #123 has been resolved</p>
                      <span className="text-xs text-slate-400">2 hours ago</span>
                    </div>
                    <div className="px-4 py-2 border-b border-slate-700 hover:bg-slate-700">
                      <p className="text-white text-sm">New comment on your report</p>
                      <span className="text-xs text-slate-400">1 day ago</span>
                    </div>
                    <div className="px-4 py-2 hover:bg-slate-700">
                      <p className="text-white text-sm">System maintenance scheduled</p>
                      <span className="text-xs text-slate-400">3 days ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
             
            {/* User Menu */}
            <div className="relative">
              <button
                className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold"
                onClick={() => toggleDropdown('user')}
              >
                U
              </button>
              {activeDropdown === 'user' && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
                  <div className="flex items-center p-4 border-b border-slate-700">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      U
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white text-sm font-semibold">User Name</h4>
                      <p className="text-slate-400 text-xs">user@example.com</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {userMenuItems.map((item) => (
                      <Link
                        to={item.path}
                        key={item.path}
                        className="px-4 py-2 text-slate-300 text-sm hover:bg-indigo-500/10 hover:text-white"
                      >
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16"></div>
    </>
  );
}

export default Navbar;
