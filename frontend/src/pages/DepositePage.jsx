import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const DepositPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/api/projects/${projectId}`);
        setProject(res.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleConfirmDeposit = async () => {
    try {
      await axios.post(`/api/projects/deposit/${projectId}`);
      alert("Amount deposited in escrow. Project is now In Progress.");
      navigate("/company/dashboard");
    } catch (error) {
      console.error("Deposit error:", error);
      alert(error.response?.data?.message || "Deposit failed.");
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Deposit to Escrow</h2>
      <p><strong>Project:</strong> {project.title}</p>
      <p><strong>Cost:</strong> ₹{project.cost}</p>
      <p><strong>Freelancer:</strong> {project.acceptedFreelancer?.name || "Not Assigned"}</p>
      <button
        onClick={handleConfirmDeposit}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Confirm Deposit
      </button>
    </div>
  );
};

export default DepositPage;
