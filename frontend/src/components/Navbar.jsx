import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import ProfileWindow from "./FreelancerProfile"; // Import the Profile Window component

const Navbar = () => {
  const [enabled, setEnabled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporary state for login simulation
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Close profile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-container")) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-green-100 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/">Logo</Link>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 text-gray-800">
        <li>
          <Link to="/" className="cursor-pointer hover:text-gray-600">Home</Link>
        </li>
        <li>
          <Link to="/projects" className="cursor-pointer hover:text-gray-600">Projects</Link>
        </li>
        <li>
          <Link to="/about" className="cursor-pointer hover:text-gray-600">About Us</Link>
        </li>
        <li>
          <Link to="/blog" className="cursor-pointer hover:text-gray-600">Blogs</Link>
        </li>
        <li>
          <Link to="/features" className="cursor-pointer hover:text-gray-600">Features</Link>
        </li>
      </ul>

      {/* Toggle Switch, Profile/Login Section */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Switch */}
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-green-500" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform bg-white rounded-full transition`}
          />
        </Switch>

        {/* Conditional Rendering for Login/Profile */}
        {isLoggedIn ? (
          // Profile Section when logged in
          <div className="relative profile-container">
            <img
              src="https://via.placeholder.com/40" // Replace with actual profile image
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 hover:border-gray-500"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
            <ProfileWindow isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} style={{ display: isProfileOpen ? "block" : "none" }} />

          </div>
        ) : (
          // Login Button when not logged in
          <button
          className="bg-gray-500 text-white px-4 py-1 rounded-lg hover:bg-gray-600"
          onClick={() => {
            setIsLoggedIn(true); // Simulating login
            navigate("/login");  // Navigate to the login page
          }}
        >
          Login
        </button>
        
        )}
      </div>
    </nav>
  );
};

export default Navbar;
