import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clientIcon from "../assets/company.png";
import freelancerIcon from "../assets/freelancer.png";
// Import ToastContainer and toast from react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    localStorage.setItem("role", role); 
  };

  const handleCreateAccount = () => {
    if (!selectedRole) {
      toast.success("Please select a role first.");  
      return;
    }

    if (selectedRole === "client") {
      navigate("/company-registration");
    } else if (selectedRole === "freelancer") {
      navigate("/freelancer-registration");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="mt-10 text-2xl max-w-2xl mx-auto">Join as a client or freelancer</div>

      {/* Role Selection */}
      <div className="flex justify-center space-x-8 mt-5">
        <div
          className={`border-3 p-6 rounded-lg cursor-pointer ${
            selectedRole === "client" ? "border-green-500" : "border-gray-300"
          }`}
          onClick={() => handleRoleSelection("client")}
        >
          <img src={clientIcon} alt="Client" className="mb-4 h-50" />
          <p className="text-center font-medium">I’m a client, hiring for project</p>
        </div>

        <div
          className={`border-3 p-6 rounded-lg cursor-pointer ${
            selectedRole === "freelancer" ? "border-green-500" : "border-gray-300"
          }`}
          onClick={() => handleRoleSelection("freelancer")}
        >
          <img src={freelancerIcon} alt="Freelancer" className="mb-4 h-50" />
          <p className="text-center font-medium">I’m a freelancer, looking for work</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center mt-10">
        <button
          className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:from-green-600 hover:to-green-700 hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleCreateAccount}
        >
          Create Account
        </button>
        <p className="mt-5 text-lg">
          Already have an account?{" "}
          <span
            className="text-green-500 cursor-pointer"
            onClick={() => {
              if (!selectedRole) {
                toast.success("Please select a role first.");  // Success toast in green
                return;
              } else {
                navigate(`/login/${selectedRole}`);
              }
            }}
          >
            Log In
          </span>
        </p>
      </div>

      {/* ToastContainer to show the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
