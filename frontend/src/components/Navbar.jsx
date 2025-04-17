import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { AuthContext } from "../context/AuthContext";
import ProfileWindow from "./FreelancerProfile";
import CompanyProfileWindow from "./CompanyProfile"; // 🆕 Import company profile

const Navbar = () => {
  const [enabled, setEnabled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, logout } = useContext(AuthContext);
  const userModel = localStorage.getItem("userModel"); // 🔥 Get user model

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("userModel");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/loginPage");
  };

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
      <div className="text-2xl font-bold">
        <Link to="/">Logo</Link>
      </div>

      <ul className="hidden md:flex space-x-6 text-gray-800">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/features">Features</Link>
        </li>
        <li>
          <Link to="/blog">Blogs</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
      </ul>

      <div className="flex items-center space-x-4">
        {/* <Switch
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
        </Switch> */}

        {isLoggedIn ? (
          <div className="relative profile-container flex items-center space-x-2">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.GHGGLYe7gDfZUzF_tElxiQHaHa&pid=Api&P=0&h=180"
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 hover:border-gray-500"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>

            {/* 🔁 Conditional rendering of profile window */}
            {userModel === "Freelancer" ? (
              <ProfileWindow
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
              />
            ) : userModel === "Company" ? (
              <CompanyProfileWindow
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
              />
            ) : null}
          </div>
        ) : (
          <button
            onClick={() => navigate("/loginPage")}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:from-green-600 hover:to-green-700 hover:scale-105 transition duration-300 ease-in-out"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
