import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMemo } from 'react';
import {useNavigate } from "react-router-dom";
import {

  FaStar,
  FaMoneyBillWave,
  FaUserFriends,
  FaCommentDots,
  FaBriefcase,
  FaHandshake,
  FaBlogger,
  FaUsers,
  FaRegStar,
  FaHtml5,
  FaJava,
  FaAngular,
  FaRobot,
  FaJsSquare,
  FaReact,
  FaMobileAlt,
  FaPython,
  FaDatabase,
} from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiPostgresql } from "react-icons/si";
import { motion } from "framer-motion";
import Dispute from "../components/Dispute";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      ease: "easeInOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 1 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const categoryData = [
  { name: "HTML", icon: <FaHtml5 className="text-green-700 w-6 h-6" /> },
  { name: "Java", icon: <FaJava className="text-green-700 w-6 h-6" /> },
  { name: "Angular JS", icon: <FaAngular className="text-green-700 w-6 h-6" /> },
  { name: "Machine Learning", icon: <FaRobot className="text-green-700 w-6 h-6" /> },
  { name: "JavaScript", icon: <FaJsSquare className="text-green-700 w-6 h-6" /> },
  { name: "React JS", icon: <FaReact className="text-green-700 w-6 h-6" /> },
  { name: "App Dev", icon: <FaMobileAlt className="text-green-700 w-6 h-6" /> },
  { name: "Python", icon: <FaPython className="text-green-700 w-6 h-6" /> },
  { name: "Next JS", icon: <SiNextdotjs className="text-green-700 w-6 h-6" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-green-700 w-6 h-6" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-green-700 w-6 h-6" /> },
  { name: "Database", icon: <FaDatabase className="text-green-700 w-6 h-6" /> },
];

const CompanyDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [getApplicants, setGetApplicants] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedFreelancer, setExpandedFreelancer] = useState(null);
  const companyId = localStorage.getItem("companyId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/companies/all-applicants/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGetApplicants(response.data);
    } catch (error) {
      setGetApplicants([]);
    }
    setLoading(false);
  };

 const fetchOngoingProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/companies/ongoing/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(response.data);
    } catch (error) {
      setProjects([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplicants();
  }, [companyId, token]);
  useEffect(() => {
    fetchOngoingProjects();
  }, [companyId, token]);


  const groupedApplicants = useMemo(() => {
  const grouped = {};
  getApplicants.forEach((app) => {
    const projectId = app.projectId;
    if (!grouped[projectId]) {
      grouped[projectId] = {
        projectTitle: app.projectTitle,
        applicants: [],
      };
    }
    grouped[projectId].applicants.push(app);
  });
  return grouped;
}, [getApplicants]);



  const handleDecision = async (projectId, freelancerId, action) => {
    try {
      const endpoint =
        action === "approve"
          ? `http://localhost:8000/api/projects/approve/${projectId}/${freelancerId}`
          : `http://localhost:8000/api/projects/reject/${projectId}/${freelancerId}`;

      await axios.put(endpoint, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`Application ${action}ed!`);
      await fetchOngoingProjects();
    } catch (err) {
      console.error("Decision error:", err);
      alert("Something went wrong!");
    }
  };


const handleDeposit = async (project) => {
  try { 
    const payload = {
      projectId: project._id,
      freelancerId: project.acceptedFreelancer._id,
      companyId: localStorage.getItem("userId"), // Assuming you have company data in state
      amount: project.cost,
    };
    console.log("Deposit payload:", payload);
    const res = await axios.post(
      "http://localhost:8000/api/payments/initiate",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`, // if using JWT
        },
      }
    );

    if (res.data && res.data.paymentUrl) {
      // Redirect to payment gateway
      window.location.href = res.data.paymentUrl;
    } else {
      alert("Payment initiation failed.");
    }
  } catch (error) {
    console.error("Deposit error:", error);
    alert("Failed to process deposit.");
  }
};


  return (
    <div className="bg-white text-black min-h-screen font-poppins px-4">
      <div className="max-w-6xl mx-auto py-6">
        <h1 className="text-5xl font-semibold mt-5 mb-10 text-center">
          Welcome Employer !!
        </h1>

        {/* What you'll get */}
        <div className="mt-12 px-6 py-10 bg-green-50 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-[#365649] text-center mb-10">
            What you will get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="flex flex-col items-center px-4">
              <FaStar className="w-10 h-10 text-green-700 mb-4" />
              <p className="text-xl font-semibold mb-2">
                Discover Quality Talent
              </p>
              <p className="text-gray-700">
                Get introduced to talented individuals across the globe
              </p>
            </div>
            <div className="flex flex-col items-center px-4">
              <FaMoneyBillWave className="w-10 h-10 text-green-700 mb-4" />
              <p className="text-xl font-semibold mb-2">
                Flexible Payment Options
              </p>
              <p className="text-gray-700">
                Choose your own convenient mode of payment.
              </p>
            </div>
            <div className="flex flex-col items-center px-4">
              <FaUserFriends className="w-10 h-10 text-green-700 mb-4" />
              <p className="text-xl font-semibold mb-2">
                Personalized Collaboration
              </p>
              <p className="text-gray-700">
                Get personalized connect with the freelancers.
              </p>
            </div>
            <div className="flex flex-col items-center px-4">
              <FaCommentDots className="w-10 h-10 text-green-700 mb-4" />
              <p className="text-xl font-semibold mb-2">Insightful Feedback</p>
              <p className="text-gray-700">
                Get to know the reviews of freelancers over the kind of work.
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-20">
          <h2 className="text-3xl text-center mt-10 font-semibold mb-10">
            Categories
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm font-medium"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {categoryData.map(({ name, icon }) => (
              <motion.div
                key={name}
                className="py-4 px-2 bg-green-50 rounded shadow hover:-translate-y-1 transition-transform duration-200"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-2">{icon}</div>
                <p className="text-green-800 font-semibold">{name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Jobs */}
        <div className="mt-20 mb-20">
          <h2 className="text-3xl text-center font-semibold mb-20">Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="bg-green-50 p-6 rounded shadow text-center flex flex-col items-center">
              <FaBriefcase className="w-12 h-12 text-green-700 mb-3" />
              <p className="font-semibold mb-1">Post your job request</p>
              <p className="text-sm mb-4">
                Post the job details to hire freelancers and get connected to
                the talent.
              </p>
              <Link to="/add-project">
                <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
                  Post a job
                </button>
              </Link>
            </div>
            <div className="bg-green-50 p-6 rounded shadow text-center flex flex-col items-center">
              <FaHandshake className="w-12 h-12 text-green-700 mb-3" />
              <p className="font-semibold mb-1">Buy a Project</p>
              <p className="text-sm mb-4">
                Surf through all the projects and buy a ready-to-use project.
              </p>
              <Link to="/buy-project">
                <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
                  Buy a project
                </button>
              </Link>
            </div>
          </div>
        </div>

{/* Ongoing Projects - Accepted Freelancers */}
<div className="mt-30 flex flex-col items-center">
  <h2 className="text-3xl text-center font-semibold mb-6">
    Ongoing Projects
  </h2>

  {projects.length === 0 ? (
    <p className="text-gray-600">No ongoing projects found.</p>
  ) : (
    <div className="mt-8 w-full overflow-x-auto px-4">
      <table className="min-w-full border rounded-lg shadow bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Cost</th>
            <th className="p-3 text-left">Deadline</th>
            <th className="p-3 text-left">Tech Stack</th>
            <th className="p-3 text-left">Freelancer</th>
            <th className="p-3 text-left">Mode</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
            <th className="p-3 text-left">Deposit</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium">{project.title}</td>
              <td className="p-3 text-gray-600">
                {project.description.length > 50
                  ? project.description.slice(0, 50) + "..."
                  : project.description}
              </td>
              <td className="p-3">₹{project.cost}</td>
              <td className="p-3">
                {new Date(project.deadline).toLocaleDateString()}
              </td>
              <td className="p-3">{project.techStack.join(", ")}</td>
              <td className="p-3">
                {project.acceptedFreelancer ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={project.acceptedFreelancer.profileImage}
                      alt="profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">
                        {project.acceptedFreelancer.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {project.acceptedFreelancer.title}
                      </p>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400">Not Assigned</span>
                )}
              </td>
              <td className="p-3">{project.modeOfWork}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    project.status === "In Progress"
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                >
                  {project.status}
                </span>
              </td>
              <td className="p-3">
                {project.acceptedFreelancer && (
                  <Link
                    to={`/freelancer/profile/${project.acceptedFreelancer._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </Link>
                )}
              </td>
              <td className="p-3 bg">
              <button onClick={() => handleDeposit(project)}
                className="bg-green-500 text-white px-1 py-1 rounded hover:bg-blue-700">
                Deposit
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


        {/* Project Applications */}
     {/* Project Applications Section with Table & Expandable Freelancer Panel */}
<div className="mt-16">
  <h2 className="text-3xl font-semibold text-center mb-10">Freelancer Applications</h2>
  {Object.entries(groupedApplicants).map(([projectId, project]) => (
    <div key={projectId} className="mb-10 bg-white rounded-lg shadow border">
      <h3 className="text-2xl font-semibold bg-green-100 px-6 py-4 border-b text-green-800">
        Project: {project.projectTitle}
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Email</th>
              <th className="px-6 py-3 text-left font-semibold">Phone</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {project.applicants
              .filter((app) => app.status === "applied")
              .map((app) => (
                <React.Fragment key={app._id}>
                  <tr
                    className="cursor-pointer hover:bg-green-50 transition"
                    onClick={() =>
                      setExpandedFreelancer(
                        expandedFreelancer === app._id ? null : app._id
                      )
                    }
                  >
                    <td className="px-6 py-4">{app.freelancerId?.fullName}</td>
                    <td className="px-6 py-4">{app.freelancerId?.email}</td>
                    <td className="px-6 py-4">{app.freelancerId?.phone}</td>
                    <td className="px-6 py-4 flex flex-wrap gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDecision(projectId, app.freelancerId._id, "approve");
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                        disabled={app.status === "accepted"}
                      >
                        Accept
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDecision(projectId, app.freelancerId._id, "reject");
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                        disabled={app.status === "rejected"}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Freelancer Profile */}
                  {expandedFreelancer === app._id && (
                    <tr>
                      <td colSpan="4" className="bg-gray-50 p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                          {app.freelancerId?.profileImage && (
                            <img
                              src={app.freelancerId.profileImage}
                              alt="Profile"
                              className="w-28 h-28 rounded-full object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <p><strong>Address:</strong> {app.freelancerId?.address}</p>
                            <p><strong>DOB:</strong> {new Date(app.freelancerId?.dob).toLocaleDateString()}</p>
                            <p><strong>Experience:</strong> {app.freelancerId?.experience} years</p>
                            <p><strong>Languages:</strong> {app.freelancerId?.languages?.join(", ")}</p>
                            <p><strong>Skills:</strong> {app.freelancerId?.skills?.join(", ")}</p>
                            <div className="mt-3">
                              {app.freelancerId?.resume && (
                                <a
                                  href={app.freelancerId.resume}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline mr-4"
                                >
                                  View Resume
                                </a>
                              )}
                              {app.freelancerId?.portfolio && (
                                <a
                                  href={app.freelancerId.portfolio}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline mr-4"
                                >
                                  Portfolio
                                </a>
                              )}
                              {app.freelancerId?.linkedin && (
                                <a
                                  href={app.freelancerId.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  LinkedIn
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  ))}
</div>




        {/* Freelancer Connect */}
        <div className="mt-30">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm mb-20">
            <div className="bg-green-50 p-6 rounded shadow text-center hover:-translate-y-1 transition-transform duration-200">
              <FaBlogger className="mx-auto w-10 h-10 mb-3 text-green-600" />
              <p className="font-semibold mb-1">Blogs</p>
              <p className="mb-7">
                View the project documentation for past volunteers.
              </p>
              <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
                View Blogs
              </button>
            </div>
            <div className="bg-green-50 p-6 rounded shadow text-center hover:-translate-y-1 transition-transform duration-200">
              <FaUsers className="mx-auto w-10 h-10 mb-3 text-green-600" />
              <p className="font-semibold mb-1">Connect with Freelancers</p>
              <p className="mb-7">
                Build a community of freelancers suggesting for improvisation in
                the project.
              </p>
              <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
                Suggestions
              </button>
            </div>
            <div className="bg-green-50 p-6 rounded shadow text-center hover:-translate-y-1 transition-transform duration-400">
              <FaRegStar className="mx-auto w-10 h-10 mb-3 text-green-600" />
              <p className="font-semibold mb-1">Post a Review</p>
              <p className="mb-7">
                Write a review about the freelancers you worked with.
              </p>
              <button className="bg-green-600 text-white px-5 py-2 rounded-xl">
                Post Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
