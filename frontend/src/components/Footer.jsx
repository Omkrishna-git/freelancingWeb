import React from "react";
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#6c877b] text-white p-6 md:p-10">
      {/* Navigation Links */}
      <div className="flex justify-center space-x-6 text-sm text-gray-200">
        <a href="#" className="hover:underline">Categories</a>
        <a href="#" className="hover:underline">For Clients</a>
        <a href="#" className="hover:underline">For Freelancers</a>
        <a href="#" className="hover:underline">Business Solutions</a>
        <a href="#" className="hover:underline">Admin</a>
        <a href="#" className="hover:underline">Company</a>
      </div>

      {/* Horizontal Line */}
      <hr className="border-gray-500 my-4" />

      {/* Logo & Tagline */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-2xl font-semibold">Logo</h3>
          <p className="text-gray-200 text-sm">
            The World's Top Talent, On Demand ®
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <FaLinkedin size={22} />
          <FaInstagram size={22} />
          <FaFacebook size={22} />
          <FaYoutube size={22} />
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-gray-500 my-4" />

      {/* Copyright & Policies */}
      <div className="text-center text-sm text-gray-200">
        <p>Copyright 2010 - 2025 Toptal, LLC</p>
        <p className="mt-1">
          <a href="#" className="hover:underline">Privacy Policy</a> |{" "}
          <a href="#" className="hover:underline">Website Terms</a> |{" "}
          <a href="#" className="hover:underline">Accessibility</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
