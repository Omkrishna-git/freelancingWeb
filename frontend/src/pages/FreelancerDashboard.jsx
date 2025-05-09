import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

const FreelancerDetails = () => {
  const [acceptedProjects, setAcceptedProjects] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/projects/available").then((res) => {
      const data = Array.isArray(res.data) ? res.data : res.data.projects;
      setAvailableProjects(data || []);
    });

    axios
      .get("http://localhost:8000/api/freelancerprojects/accepted", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setAcceptedProjects(res.data);
      });
  }, []);

  return (
    <div className="max-w-7xl w-full mx-auto p-6">
      <DetailsSection />
      <AcceptedProjects projects={acceptedProjects} />
      <AvailableProjects
        projects={availableProjects}
        setProjects={setAvailableProjects}
        setAcceptedProjects={setAcceptedProjects}
      />
    </div>
  );
};

const DetailsSection = () => {
  const data = {
    labels: ["Completed Work", "Pending Work"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#4CAF50", "#c0e3d2"],
        hoverBackgroundColor: ["#45a049", "#c0e3d2"],
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

const AcceptedProjects = ({ projects }) => {
  return (
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
            <div
              key={project._id}
              className="bg-green-100 rounded-2xl shadow-md p-6 flex flex-col items-center text-center"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {project.title}
              </h3>
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
              <div className="bg-white px-4 py-2 rounded-full text-sm text-gray-800 text-center shadow">
                <strong>Deadline:</strong>{" "}
                {new Date(project.deadline).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const AvailableProjects = ({ projects, setProjects, setAcceptedProjects }) => {
  const [loading, setLoading] = useState(false);

  const handleAccept = (projectId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to accept projects.");
      return;
    }

    const project = projects.find((p) => p._id === projectId);

    axios
      .put(
        `http://localhost:8000/api/projects/accept/${projectId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setProjects((prev) => prev.filter((p) => p._id !== projectId));
        setAcceptedProjects((prev) => [...prev, project]);
        console.log("Project accepted:", res.data);
      })
      .catch((err) => {
        console.error("Error accepting project:", err);
        alert("Failed to accept project. Make sure you are authenticated.");
      });
  };

  const renderProjectCard = (project) => (
    <div
      key={project._id}
      className="bg-green-100 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-all"
    >
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
        onClick={() => handleAccept(project._id)}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-md transition duration-200"
      >
        Accept
      </button>
    </div>
  );

  return (
    <div className="mt-10 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Available Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center col-span-full text-gray-500">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No available projects found.
          </p>
        ) : (
          projects.map(renderProjectCard)
        )}
      </div>
    </div>
  );
};

export default FreelancerDetails;
