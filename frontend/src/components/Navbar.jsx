import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome, FiAlertCircle, FiList, FiUser, FiSettings, FiLogOut, FiBell
} from "react-icons/fi";

import logo from "../assets/logo.png"; // keep your path

function Navbar() {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [notifications] = useState(3);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);

    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const toggleDropdown = (menu) =>
    setActiveDropdown(activeDropdown === menu ? null : menu);

  const navLinks = [
    { path: "/", label: "Home", icon: <FiHome className="h-5 w-5 " /> },
    { path: "/report", label: "Report Issue", icon: <FiAlertCircle className="h-5 w-5" /> },
    { path: "/view", label: "My Issues", icon: <FiList className="h-5 w-5" /> },
  ];

  const userMenuItems = [
    { path: "/profile", label: "My Profile", icon: <FiUser /> },
    { path: "/settings", label: "Settings", icon: <FiSettings /> },
    { path: "/logout", label: "Logout", icon: <FiLogOut /> },
  ];

  return (
    <>
      <nav
        className={[
          "fixed z-[1000] h-16 transition-all duration-500 ease-out",
          scrolled
            ? // SCROLLED: centered, narrower, glassy, dark blue tint
              "top-3 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl rounded-2xl " +
              "bg-[#0a1a3f]/70 backdrop-blur-xl border border-white/15 shadow-lg shadow-black/20"
            : // TOP: full-width bar
              "top-0 left-0 w-full border-b border-slate-700 " +
              "bg-gradient-to-r from-slate-900 to-slate-800"
        ].join(" ")}
        ref={dropdownRef}
      >
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
  to="/"
  className="flex items-center gap-2 no-underline decoration-none hover:no-underline"
>
  <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
  <span className="text-xl font-semibold text-white">EaiserAi</span>
</Link>


          {/* Links */}
          <ul className="flex items-center gap-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
  to={link.path}
  className={[
    "flex items-center px-4 py-2 text-white text-sm font-medium rounded-md",
    "transition-all duration-300 no-underline hover:no-underline decoration-none",
    location.pathname === link.path
      ? "bg-white/10"
      : "hover:bg-white/5"
  ].join(" ")}
>
  {link.icon}
  <span className="ml-2">{link.label}</span>
</Link>

              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                className="p-2 rounded-md hover:bg-white/10 transition"
                onClick={() => toggleDropdown("notifications")}
                aria-label="Notifications"
              >
                <FiBell className="text-white text-xl" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-1.5 rounded-full">
                    {notifications}
                  </span>
                )}
              </button>

              {activeDropdown === "notifications" && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900/95 rounded-lg shadow-lg border border-white/10 overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-2 border-b border-white/10">
                    <h3 className="text-white text-sm font-semibold">Notifications</h3>
                    <button className="text-indigo-300 text-xs hover:text-indigo-400">
                      Mark all as read
                    </button>
                  </div>
                  <div>
                    <div className="px-4 py-2 border-b border-white/10 hover:bg-white/5">
                      <p className="text-white text-sm">Your issue #123 has been resolved</p>
                      <span className="text-xs text-slate-400">2 hours ago</span>
                    </div>
                    <div className="px-4 py-2 border-b border-white/10 hover:bg-white/5">
                      <p className="text-white text-sm">New comment on your report</p>
                      <span className="text-xs text-slate-400">1 day ago</span>
                    </div>
                    <div className="px-4 py-2 hover:bg-white/5">
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
                onClick={() => toggleDropdown("user")}
                aria-label="User menu"
              >
                U
              </button>

              {activeDropdown === "user" && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 rounded-lg shadow-lg border border-white/10">
                  <div className="flex items-center p-4 border-b border-white/10">
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
                        className="px-4 py-2 text-slate-300 text-sm hover:bg-white/5 hover:text-white no-underline hover:no-underline"
                      >
                        {item.icon && <span className="mr-2 inline-block">{item.icon}</span>}
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

      {/* Spacer so content isn't hidden behind the fixed nav */}
      <div className="pt-16" /> {/* reduced from pt-20 to avoid big white gap */}
    </>
  );
}

export default Navbar;
