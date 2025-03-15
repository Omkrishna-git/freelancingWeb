import React from "react";
import { Link } from "react-router-dom";
import { Switch } from "@headlessui/react";

const Navbar = () => {
  const [enabled, setEnabled] = React.useState(false);

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
          <Link to="/blogs" className="cursor-pointer hover:text-gray-600">Blogs</Link>
        </li>
        <li>
          <Link to="/features" className="cursor-pointer hover:text-gray-600">Features</Link>
        </li>
      </ul>

      {/* Toggle Switch & Login Button */}
      <div className="flex items-center space-x-4">
        {/* Toggle Switch */}
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

        {/* Login Button */}
        <button className="bg-gray-500 text-white px-4 py-1 rounded-lg hover:bg-gray-600">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
