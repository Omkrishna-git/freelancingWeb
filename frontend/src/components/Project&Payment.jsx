import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectsTable = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("az");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/projects");
        console.log("Fetched projects:", response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects
    .filter((project) =>
      project.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOption === "az"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects Table</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by project title..."
          className="border border-gray-300 px-4 py-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border border-gray-300 px-4 py-2 rounded"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="az">Sort A-Z</option>
          <option value="za">Sort Z-A</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Company</th>
              <th className="py-2 px-4">Freelancer</th>
              <th className="py-2 px-4">Budget</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Payment Mode</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No projects found
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => (
                <tr key={project._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4">{project.title}</td>
                  <td className="py-2 px-4">
                    {project.companyId?.organization || "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    {project.freelancerId?.fullName || "N/A"}
                  </td>
                  <td className="py-2 px-4">${project.cost}</td>
                  <td className="py-2 px-4">
                    {project.status === "Completed" && project.paymentMode === "Through this platform" ? (
                      <button className="text-blue-500">Release Fund</button>
                    ) : (
                      project.status
                    )}
                  </td>
                  <td className="py-2 px-4">{project.paymentMode}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;
