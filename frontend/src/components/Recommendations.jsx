import React, { useEffect, useState } from "react";

const Recommendations = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setProjects([]);
      setError("You must be logged in to see recommendations.");
      return;
    }
    fetch("http://localhost:8000/api/recommendations/projects", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
          setError("");
        } else {
          setProjects([]);
          setError(data.message || "Failed to fetch recommendations.");
        }
      })
      .catch(() => {
        setProjects([]);
        setError("Network error.");
      });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recommended Company Projects</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <ul>
        {projects.length === 0 && !error ? (
          <li>No recommendations found.</li>
        ) : (
          Array.isArray(projects) && projects.map(project => (
            <li key={project._id} className="mb-4 p-4 bg-green-50 rounded shadow">
              <div className="font-semibold">{project.title}</div>
              <div>{project.description}</div>
              <div>
                <span className="text-sm text-gray-700">Tech Stack: {project.techStack?.join(", ")}</span>
              </div>
              <div>
                <span className="text-sm text-gray-700">Mode: {project.modeOfWork}</span>
              </div>
              <div>
                <span className="text-sm text-gray-700">Deadline: {project.deadline?.slice(0,10)}</span>
              </div>
              <div className="text-green-700 font-bold">₹{project.cost}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Recommendations;