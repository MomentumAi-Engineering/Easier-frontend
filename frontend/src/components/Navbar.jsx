import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiAlertCircle, FiList, FiInfo, FiMail, FiHelpCircle, FiCode, FiBook, FiUser, FiMenu, FiX, FiBell, FiSearch, FiGlobe, FiMoon, FiSun, FiCpu, FiZap, FiStar, FiSettings, FiLogOut } from 'react-icons/fi';

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) setActiveDropdown(null);
  };
  
  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setSearchQuery('');
  };
  
  const navLinks = [
    { path: '/', label: 'Dashboard', icon: <FiHome className="nav-icon" /> },
    { path: '/report', label: 'Report Issue', icon: <FiAlertCircle className="nav-icon" />, highlight: true },
    { path: '/view', label: 'View Issues', icon: <FiList className="nav-icon" /> },
    { path: '/analytics', label: 'Analytics', icon: <FiZap className="nav-icon" /> },
    { path: '/about', label: 'About', icon: <FiInfo className="nav-icon" /> },
  ];
  
  const resourceLinks = [
    { path: '/help', label: 'AI Assistant', icon: <FiCpu className="dropdown-icon" /> },
    { path: '/api', label: 'API Docs', icon: <FiCode className="dropdown-icon" /> },
    { path: '/blog', label: 'Blog', icon: <FiBook className="dropdown-icon" /> },
    { path: '/tutorials', label: 'Tutorials', icon: <FiStar className="dropdown-icon" /> },
  ];
  
  const userMenuItems = [
    { path: '/profile', label: 'My Profile', icon: <FiUser /> },
    { path: '/settings', label: 'Settings', icon: <FiSettings /> },
    { path: '/billing', label: 'Billing' },
    { path: '/logout', label: 'Logout', icon: <FiLogOut /> },
  ];
  
  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="mobile-toggle" onClick={toggleMobileMenu}>
        <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      {/* Overlay */}
      <div className={`overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}></div>
      
      {/* Vertical Sidebar Navigation */}
      <nav className={`navbar ${isMobileMenuOpen ? 'mobile-active' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo Section */}
          <Link to="/" className="navbar-logo">
            <div className="logo-container">
              <div className="logo-icon">
                <div className="logo-circle"></div>
                <div className="logo-square"></div>
                <div className="logo-glow"></div>
              </div>
              <div className="logo-text">
                <span className="logo-main">SNAPFIX</span>
                <span className="logo-sub">AI</span>
              </div>
            </div>
          </Link>
          
          {/* Search Bar */}
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search issues, reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </form>
          </div>
          
          {/* Navigation Links */}
          <div className="navbar-menu">
            <ul className="navbar-nav">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.path}>
                  <Link
                    to={link.path}
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''} ${link.highlight ? 'highlight' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={() => setHoveredItem(link.path)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                    {link.highlight && <span className="nav-badge">NEW</span>}
                    {hoveredItem === link.path && (
                      <div className="nav-link-glow"></div>
                    )}
                  </Link>
                </li>
              ))}
              
              <li className="nav-item dropdown" ref={dropdownRef}>
                <button 
                  className="nav-link dropdown-toggle" 
                  onClick={() => toggleDropdown('resources')}
                >
                  <FiBook className="nav-icon" />
                  <span>Resources</span>
                  <span className="dropdown-arrow"></span>
                </button>
                <div className={`dropdown-menu ${activeDropdown === 'resources' ? 'show' : ''}`}>
                  {resourceLinks.map((link) => (
                    <Link 
                      to={link.path} 
                      className="dropdown-item" 
                      key={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </div>
          
          {/* AI Assistant */}
          <div className="ai-assistant-container">
            <button 
              className={`ai-assistant-btn ${aiAssistantOpen ? 'active' : ''}`}
              onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
            >
              <div className="ai-icon-container">
                <FiCpu className="ai-icon" />
                <div className="ai-pulse"></div>
              </div>
              <span>AI Assistant</span>
            </button>
          </div>
          
          {/* Bottom Actions */}
          <div className="navbar-actions">
            <div className="action-item">
              <button className="icon-button" onClick={() => toggleDropdown('notifications')}>
                <FiBell className="action-icon" />
                {notifications > 0 && <span className="notification-badge">{notifications}</span>}
              </button>
              {activeDropdown === 'notifications' && (
                <div className="dropdown-panel">
                  <div className="dropdown-header">
                    <h3>Notifications</h3>
                    <button className="mark-read">Mark all as read</button>
                  </div>
                  <div className="notification-list">
                    <div className="notification-item unread">
                      <div className="notification-content">
                        <p>Your issue #123 has been resolved</p>
                        <span className="notification-time">2 hours ago</span>
                      </div>
                    </div>
                    <div className="notification-item unread">
                      <div className="notification-content">
                        <p>New comment on your report</p>
                        <span className="notification-time">1 day ago</span>
                      </div>
                    </div>
                    <div className="notification-item">
                      <div className="notification-content">
                        <p>System maintenance scheduled</p>
                        <span className="notification-time">3 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="action-item">
              <button className="icon-button" onClick={toggleDarkMode}>
                {darkMode ? <FiSun className="action-icon" /> : <FiMoon className="action-icon" />}
              </button>
            </div>
            
            <div className="action-item">
              <button className="icon-button" onClick={() => toggleDropdown('language')}>
                <FiGlobe className="action-icon" />
              </button>
              {activeDropdown === 'language' && (
                <div className="dropdown-panel language-panel">
                  <div className="language-list">
                    <button className="language-option active">English</button>
                    <button className="language-option">Spanish</button>
                    <button className="language-option">French</button>
                    <button className="language-option">German</button>
                    <button className="language-option">Chinese</button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="action-item">
              <button className="icon-button user-button" onClick={() => toggleDropdown('user')}>
                <div className="user-avatar">
                  <span>U</span>
                  <div className="user-avatar-glow"></div>
                </div>
              </button>
              {activeDropdown === 'user' && (
                <div className="dropdown-panel user-panel">
                  <div className="user-info">
                    <div className="user-avatar large">
                      <span>U</span>
                      <div className="user-avatar-glow"></div>
                    </div>
                    <div className="user-details">
                      <h4>User Name</h4>
                      <p>user@example.com</p>
                    </div>
                  </div>
                  <div className="user-menu">
                    {userMenuItems.map((item) => (
                      <Link 
                        to={item.path} 
                        className="user-menu-item" 
                        key={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon && <span className="menu-item-icon">{item.icon}</span>}
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
      
      <style>{`
        :root {
          --primary-color: #6366f1;
          --primary-dark: #4f46e5;
          --primary-light: #818cf8;
          --secondary-color: #8b5cf6;
          --accent-color: #ec4899;
          --text-primary: #f8fafc;
          --text-secondary: #cbd5e1;
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --bg-tertiary: #334155;
          --border-color: #334155;
          --shadow-glow: 0 0 15px rgba(99, 102, 241, 0.5);
          --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        /* Mobile Toggle Button */
        .mobile-toggle {
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1002;
          cursor: pointer;
          background: rgba(15, 23, 42, 0.9);
          padding: 0.75rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          display: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        
        .mobile-toggle:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);
        }
        
        .hamburger {
          width: 24px;
          height: 18px;
          position: relative;
        }
        
        .hamburger span {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          background: var(--text-primary);
          border-radius: 1px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: all 0.3s ease;
        }
        
        .hamburger span:nth-child(1) {
          top: 0px;
        }
        
        .hamburger span:nth-child(2) {
          top: 8px;
        }
        
        .hamburger span:nth-child(3) {
          top: 16px;
        }
        
        .hamburger.active span:nth-child(1) {
          top: 8px;
          transform: rotate(135deg);
        }
        
        .hamburger.active span:nth-child(2) {
          opacity: 0;
          left: -60px;
        }
        
        .hamburger.active span:nth-child(3) {
          top: 8px;
          transform: rotate(-135deg);
        }
        
        /* Overlay */
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);
        }
        
        .overlay.active {
          opacity: 1;
          visibility: visible;
        }
        
        /* Vertical Sidebar Navigation */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 300px;
          height: 100vh;
          background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
          backdrop-filter: blur(20px);
          border-right: 1px solid var(--border-color);
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow-y: auto;
          box-shadow: var(--shadow-lg);
        }
        
        .navbar.scrolled {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        
        .navbar-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 2rem 1.5rem;
        }
        
        /* Logo Section */
        .navbar-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          transition: transform 0.3s ease;
        }
        
        .navbar-logo:hover {
          transform: scale(1.02);
        }
        
        .logo-container {
          display: flex;
          align-items: center;
        }
        
        .logo-icon {
          position: relative;
          width: 48px;
          height: 48px;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .logo-circle {
          position: absolute;
          top: 4px;
          left: 4px;
          width: 20px;
          height: 20px;
          background: var(--primary-color);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.7);
        }
        
        .logo-square {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 20px;
          height: 20px;
          background: var(--secondary-color);
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.7);
        }
        
        .logo-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: logoGlow 3s infinite alternate;
        }
        
        @keyframes logoGlow {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 0.8; }
        }
        
        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        
        .logo-main {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 1px;
          text-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        }
        
        .logo-sub {
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--primary-light);
          letter-spacing: 2px;
          margin-top: 3px;
        }
        
        /* Search Bar */
        .search-container {
          margin-bottom: 2rem;
        }
        
        .search-form {
          width: 100%;
        }
        
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-secondary);
          z-index: 1;
        }
        
        .search-input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2.75rem;
          background: rgba(51, 65, 85, 0.5);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          font-size: 0.9rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2), var(--shadow-glow);
        }
        
        /* Navigation Menu */
        .navbar-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-bottom: 1.5rem;
        }
        
        .navbar-nav {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .nav-item {
          position: relative;
          width: 100%;
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          padding: 0.9rem 1.2rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
          letter-spacing: 0.3px;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        
        .nav-icon {
          margin-right: 0.85rem;
          font-size: 1.2rem;
        }
        
        .nav-link:hover {
          background: rgba(99, 102, 241, 0.1);
          color: var(--text-primary);
          transform: translateX(5px);
        }
        
        .nav-link.active {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1));
          color: var(--primary-light);
          font-weight: 600;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
        }
        
        .nav-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 70%;
          background: var(--primary-color);
          border-radius: 0 2px 2px 0;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.7);
        }
        
        .nav-link.highlight {
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          color: white;
          font-weight: 600;
          margin: 0.5rem 0;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
        }
        
        .nav-link.highlight:hover {
          background: linear-gradient(135deg, var(--primary-dark), #7c3aed);
          transform: translateX(5px);
          box-shadow: 0 6px 25px rgba(99, 102, 241, 0.5);
          color: white;
        }
        
        .nav-badge {
          background: var(--accent-color);
          color: white;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 10px;
          margin-left: auto;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }
        
        .nav-link-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .nav-link:hover .nav-link-glow {
          opacity: 1;
        }
        
        /* Dropdown */
        .dropdown-toggle {
          background: none;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          font-size: 0.95rem;
          justify-content: space-between;
          display: flex;
          align-items: center;
        }
        
        .dropdown-arrow {
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid var(--text-secondary);
          transition: transform 0.2s ease;
          margin-left: auto;
        }
        
        .dropdown-toggle.active .dropdown-arrow {
          transform: rotate(180deg);
          border-top-color: var(--primary-light);
        }
        
        .dropdown-menu {
          background: rgba(51, 65, 85, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 0.5rem 0;
          margin: 0.5rem 0 0 1rem;
          opacity: 0;
          visibility: hidden;
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid var(--border-color);
        }
        
        .dropdown-menu.show {
          opacity: 1;
          visibility: visible;
          max-height: 400px;
        }
        
        .dropdown-item {
          display: flex;
          align-items: center;
          padding: 0.85rem 1.2rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          letter-spacing: 0.2px;
          border-radius: 8px;
          margin: 0.2rem 0.5rem;
        }
        
        .dropdown-icon {
          margin-right: 0.85rem;
          font-size: 1.1rem;
        }
        
        .dropdown-item:hover {
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary-light);
          transform: translateX(5px);
        }
        
        /* AI Assistant */
        .ai-assistant-container {
          margin-bottom: 1.5rem;
        }
        
        .ai-assistant-btn {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 12px;
          color: var(--text-primary);
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
        }
        
        .ai-assistant-btn:hover {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
          transform: translateY(-2px);
        }
        
        .ai-assistant-btn.active {
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
        }
        
        .ai-icon-container {
          position: relative;
          margin-right: 1rem;
        }
        
        .ai-icon {
          font-size: 1.4rem;
          color: var(--primary-light);
        }
        
        .ai-pulse {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.3);
          animation: aiPulse 2s infinite;
        }
        
        @keyframes aiPulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          70% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
        
        /* Bottom Actions */
        .navbar-actions {
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .action-item {
          position: relative;
        }
        
        .icon-button {
          background: rgba(51, 65, 85, 0.5);
          border: 1px solid var(--border-color);
          cursor: pointer;
          padding: 0.85rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          width: 100%;
          backdrop-filter: blur(10px);
        }
        
        .icon-button:hover {
          background: rgba(99, 102, 241, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
        }
        
        .action-icon {
          font-size: 1.3rem;
          color: var(--text-secondary);
        }
        
        .user-button {
          padding: 0.6rem;
        }
        
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          position: relative;
          overflow: hidden;
        }
        
        .user-avatar-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
          animation: avatarGlow 3s infinite alternate;
        }
        
        @keyframes avatarGlow {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.2); opacity: 0.6; }
        }
        
        .user-avatar.large {
          width: 52px;
          height: 52px;
          font-size: 1.3rem;
        }
        
        .notification-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: var(--accent-color);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }
        
        /* Dropdown Panels */
        .dropdown-panel {
          position: absolute;
          bottom: 100%;
          left: 0;
          width: 320px;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
          z-index: 1001;
          margin-bottom: 1rem;
          overflow: hidden;
        }
        
        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .dropdown-header h3 {
          margin: 0;
          font-size: 1.1rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        
        .mark-read {
          background: none;
          border: none;
          color: var(--primary-light);
          font-size: 0.85rem;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .mark-read:hover {
          color: var(--primary-color);
          text-decoration: underline;
        }
        
        .notification-list {
          max-height: 300px;
          overflow-y: auto;
        }
        
        .notification-item {
          padding: 1.2rem;
          border-bottom: 1px solid var(--border-color);
          transition: background 0.2s ease;
        }
        
        .notification-item:last-child {
          border-bottom: none;
        }
        
        .notification-item.unread {
          background: rgba(99, 102, 241, 0.1);
        }
        
        .notification-item:hover {
          background: rgba(51, 65, 85, 0.5);
        }
        
        .notification-content p {
          margin: 0 0 0.5rem;
          color: var(--text-primary);
          font-size: 0.95rem;
        }
        
        .notification-time {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        
        .language-panel {
          padding: 0.75rem;
        }
        
        .language-list {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .language-option {
          background: none;
          border: none;
          padding: 0.85rem 1.2rem;
          text-align: left;
          border-radius: 10px;
          color: var(--text-secondary);
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .language-option:hover {
          background: rgba(99, 102, 241, 0.1);
          color: var(--text-primary);
        }
        
        .language-option.active {
          background: rgba(99, 102, 241, 0.2);
          color: var(--primary-light);
          font-weight: 500;
        }
        
        .user-panel {
          padding: 1.2rem;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          margin-bottom: 1.2rem;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .user-details {
          margin-left: 1.2rem;
        }
        
        .user-details h4 {
          margin: 0 0 0.25rem;
          font-size: 1.1rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        
        .user-details p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        .user-menu {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .user-menu-item {
          padding: 0.85rem 1.2rem;
          border-radius: 10px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
        }
        
        .user-menu-item:hover {
          background: rgba(99, 102, 241, 0.1);
          color: var(--text-primary);
        }
        
        .menu-item-icon {
          margin-right: 0.85rem;
          font-size: 1.1rem;
        }
        
        /* Content Area Margin */
        body {
          margin-left: 300px;
          background: var(--bg-primary);
          color: var(--text-primary);
        }
        
        /* Mobile Responsive */
        @media (max-width: 992px) {
          .mobile-toggle {
            display: block;
          }
          
          .navbar {
            transform: translateX(-100%);
          }
          
          .navbar.mobile-active {
            transform: translateX(0);
          }
          
          body {
            margin-left: 0;
          }
        }
        
        @media (max-width: 576px) {
          .navbar {
            width: 100%;
          }
          
          .navbar-container {
            padding: 1.5rem 1rem;
          }
          
          .logo-main {
            font-size: 1.3rem;
          }
          
          .logo-sub {
            font-size: 0.8rem;
          }
          
          .dropdown-panel {
            width: 100%;
            left: 0;
            right: 0;
            border-radius: 16px 16px 0 0;
            bottom: 0;
            margin-bottom: 0;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;