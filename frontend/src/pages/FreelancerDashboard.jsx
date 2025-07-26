import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import Recommendations from "../components/Recommendations";
import Dispute from "../components/Dispute";
import toast from "react-hot-toast";
import { FaExclamationCircle } from "react-icons/fa";

const FreelancerDetails = () => {
  const [acceptedProjects, setAcceptedProjects] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);
  const token = localStorage.getItem("token");
  const [appliedProjects, setAppliedProjects] = useState([]);
  const freelancerId = localStorage.getItem("userId");

  // Modal state
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeProject, setDisputeProject] = useState(null);

  useEffect(() => {
    if (!freelancerId) {
      console.error("Freelancer ID not found");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_URL}/projects/available`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.projects;
        setAvailableProjects(data || []);
      })
      .catch((err) => {
        console.error("Error fetching available projects:", err);
      });

    // Fetch Accepted Projects
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/projects/accepted?freelancerId=${freelancerId}`
      )
      .then((res) => {
        setAcceptedProjects(res.data.projects || []);
      })
      .catch((err) => {
        console.error("Error fetching accepted projects:", err);
      });

    // Fetch Applied Projects
    axios
      .get(`${import.meta.env.VITE_API_URL}/projects/applied/${freelancerId}`)
      .then((res) => {
        setAppliedProjects(res.data.projects || []);
      })
      .catch((err) => {
        console.error("Error fetching applied projects:", err);
      });
  }, [freelancerId]);

  // Modal open handler
  const openDisputeModal = (project) => {
    setDisputeProject(project);
    setShowDisputeModal(true);
  };

  // Modal close handler
  const closeDisputeModal = () => {
    setShowDisputeModal(false);
    setDisputeProject(null);
  };

  return (
    <div className="max-w-7xl w-full mx-auto p-6">
      <DetailsSection
        accepted={acceptedProjects.length}
        available={availableProjects.length}
      />
      <AcceptedProjects
        projects={acceptedProjects}
        freelancerId={freelancerId}
        openDisputeModal={openDisputeModal}
      />
      <AppliedProjects
        appliedProjects={appliedProjects}
        freelancerId={freelancerId}
        openDisputeModal={openDisputeModal}
      />
      <AvailableProjects
        projects={availableProjects}
        setProjects={setAvailableProjects}
        setAcceptedProjects={setAcceptedProjects}
        appliedProjectIds={appliedProjects.map((proj) => proj._id)}
        freelancerId={freelancerId}
        openDisputeModal={openDisputeModal}
      />
      <Recommendations token={token} />

      {/* Dispute Modal */}
      {showDisputeModal && disputeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              onClick={closeDisputeModal}
            >
              &times;
            </button>
            <Dispute
              projectId={disputeProject._id}
              raisedBy="freelancer"
              raisedById={freelancerId}
              againstId={disputeProject.companyId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const DetailsSection = ({ accepted, available }) => {
  const total = accepted + available;
  const completed = accepted;
  const pending = total - completed;

  const data = {
    labels: ["Accepted", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ["#4CAF50", "#f0cfcf"],
        hoverBackgroundColor: ["#45a049", "#f7dada"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto my-6 text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Freelancer Work Status
      </h2>
      <div className="w-64 h-64 mx-auto">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

const AcceptedProjects = ({ projects = [], freelancerId, openDisputeModal }) => (
  <div className="mt-10 px-4">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
      Accepted Projects
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">
          No accepted projects found.
        </p>
      ) : (
        projects.map((project) => (
          <div key={project._id} className="bg-green-100 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-all relative">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{project.title}</h3>
            <p className="text-sm text-gray-700 mb-4">
              {project.description || "No description provided"}
            </p>

            <p className="font-semibold text-gray-800 mb-2">Tech Stack</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {project.techStack?.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-sm shadow-sm px-4 py-1 rounded-full text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 mt-4 bg-green-50 p-4 rounded-xl shadow-sm">
              <div className="flex justify-center gap-4">
                <div className="bg-white px-4 py-2 rounded-full text-sm text-gray-800 text-center shadow">
                  <strong>Cost</strong> ₹
                  {project.cost
                    ? Number(project.cost).toLocaleString("en-IN")
                    : "N/A"}
                </div>
                <div className="bg-white px-4 py-2 rounded-full text-sm text-gray-800 text-center shadow">
                  <strong>Mode</strong> {project.modeOfWork || "N/A"}
                </div>
              </div>
              <div className="bg-white px-4 py-2 rounded-full text-sm text-gray-800 text-center shadow">
                <strong>Payment</strong> {project.paymentMode || "N/A"}
              </div>

              <div className="bg-white px-5 py-2 rounded-full text-sm text-gray-800 text-center shadow">
                <strong>Deadline:</strong>{" "}
                {project.deadline
                  ? new Date(project.deadline).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>

            {/* Dispute Icon */}
            <button
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              title="Raise a dispute"
              onClick={() => openDisputeModal(project)}
            >
              <FaExclamationCircle size={22} />
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

const AppliedProjects = ({ appliedProjects, freelancerId, openDisputeModal }) => (
  <div className="mt-10 px-4">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
      Applied Projects (Pending)
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {appliedProjects.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">
          No pending applications.
        </p>
      ) : (
        appliedProjects.map((project) => (
          <div key={project._id} className="bg-green-100 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-all relative">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{project.title}</h3>
            <p className="text-sm text-gray-700 mb-4">
              {project.description || "No description provided"}
            </p>

            <p className="font-semibold text-gray-800 mb-2">Tech Stack</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {project.techStack?.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-sm shadow-sm px-4 py-1 rounded-full text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 mt-4 bg-green-50 p-4 rounded-xl shadow-sm">
              <div className="flex justify-center gap-4">
                <div className="bg-white px-4 py-2 rounded-full text-sm text-gray-800 text-center shadow">
                  <strong>Cost</strong> ₹
                  {project.cost
                    ? Number(project.cost).toLocaleString("en-IN")
                    : "N/A"}
                </div>
                <div className="bg-white px-4 py-2 rounded-full text-sm text-gray-800 text-center shadow">
                  <strong>Mode</strong> {project.modeOfWork || "N/A"}
                </div>
              </div>
              <div className="bg-white px-4 py-2 rounded-full text-sm text-gray-800 text-center shadow">
                <strong>Payment</strong> {project.paymentMode || "N/A"}
              </div>

              <div className="bg-white px-5 py-2 rounded-full text-sm text-gray-800 text-center shadow">
                <strong>Deadline:</strong>{" "}
                {project.deadline
                  ? new Date(project.deadline).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>

            {/* Dispute Icon */}
            <button
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              title="Raise a dispute"
              onClick={() => openDisputeModal(project)}
            >
              <FaExclamationCircle size={22} />
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

const AvailableProjects = ({
  projects,
  appliedProjectIds,
  setProjects,
  freelancerId,
  openDisputeModal,
}) => {
const handleApply = async (projectId) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.error("Please login to apply.");
      return;
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/projects/apply/${projectId}`,
       { freelancerId: localStorage.getItem("userId") },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Applied successfully!");
    console.log(response.data);
  } catch (error) {
    console.error("Application failed:", error?.response?.data || error.message);
    toast.error(error?.response?.data?.message || "Application failed.");
  }
};


  return (
    <div className="mt-10 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Available Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No available projects found.
          </p>
        ) : (
          projects.map((project) => {
            const alreadyApplied = appliedProjectIds.includes(project._id);
            return (
              <div key={project._id} className="bg-green-100 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-all relative">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{project.title}</h3>
                <p className="text-sm text-gray-700 mb-4">
                  {project.description || "No description provided"}
                </p>

                <p className="font-semibold text-gray-800 mb-2">Tech Stack</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {project.techStack?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-sm shadow-sm px-4 py-1 rounded-full text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-4 mt-4 bg-green-50 p-4 rounded-xl shadow-sm">
                  <div className="flex justify-center gap-4">
                    <div className="bg-white px-4 py-2 rounded-full text-sm text-gray-800 text-center shadow">
                      <strong>Cost</strong> ₹
                      {project.cost
                        ? Number(project.cost).toLocaleString("en-IN")
                        : "N/A"}
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full text-sm text-gray-800 text-center shadow">
                      <strong>Mode</strong> {project.modeOfWork || "N/A"}
                    </div>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full text-sm text-gray-800 text-center shadow">
                    <strong>Payment</strong> {project.paymentMode || "N/A"}
                  </div>

                  <div className="bg-white px-5 py-2 rounded-full text-sm text-gray-800 text-center shadow">
                    <strong>Deadline:</strong>{" "}
                    {project.deadline
                      ? new Date(project.deadline).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>

                <button
                  onClick={() => handleApply(project._id)}
                  disabled={alreadyApplied}
                  className={`mt-4 px-6 py-2 rounded-full shadow-md transition duration-200 ${
                    alreadyApplied
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {alreadyApplied ? "Applied" : "Apply"}
                </button>

                {/* Dispute Icon */}
                <button
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                  title="Raise a dispute"
                  onClick={() => openDisputeModal(project)}
                >
                  <FaExclamationCircle size={22} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FreelancerDetails;
