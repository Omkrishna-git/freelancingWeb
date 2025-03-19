import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clientIcon from "../assets/icons8-company-80.png";
import freelancerIcon from "../assets/icons8-freelancer-64.png";

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    if (role === "client") {
      navigate("/company-registration");
    }
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <div className="mt-10 text-2xl max-w-2xl mx-auto">Join as a client or freelancer</div>
      {/* Role Selection */}
      <div className="flex justify-center space-x-6 mt-5">
        <div
          className={`border p-6 rounded-lg cursor-pointer ${
            selectedRole === "client" ? "border-green-500" : "border-gray-300"
          }`}
          onClick={() => handleRoleSelection("client")} 
        >
          <img src={clientIcon} alt="Client" className="mb-4 h-50" />
          <p className="text-center font-medium">I’m a client, hiring for project</p>
        </div>

        <div
          className={`border p-6 rounded-lg cursor-pointer ${
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
        <button className="bg-green-400 text-white px-6 py-2 rounded-md font-bold">
          Create Account
        </button>
        <p className="mt-2 text-lg">
          Already have an account? <span className="text-green-500 cursor-pointer">Log In</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
