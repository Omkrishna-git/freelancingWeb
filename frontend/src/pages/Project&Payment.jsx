import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

const projects = [
  { id: 1, projectName: 'Web App Dev', companyName: 'ABC Corp', freelancer: 'John Doe', budget: 500, status: 'Ongoing', paymentMode: 'Escrow' },
  { id: 2, projectName: 'Mobile App Design', companyName: 'XYZ Ltd', freelancer: 'Jane Smith', budget: 2000, status: 'Completed', paymentMode: 'Direct' },
];

const ProjectsAndPayments = () => {
const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCategory1, setFilterCategory1] = useState("");
  const [sortOption, setSortOption] = useState("az");
  

  const filteredProjects = projects
  .filter((projects) => projects.projectName.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter((projects) => (filterCategory ? projects.status === filterCategory : true))
  .filter((projects) => (filterCategory1 ? projects.paymentMode === filterCategory1 : true))
  .sort((a, b) => sortOption === "az" ? a.projectName.localeCompare(b.projectName) : b.projectName.localeCompare(a.projectName));

  return (
    <div className='p-6'>
        {/* Search, Filter & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 mb-6">
              {/* Search Input */}
              <div className="relative w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <FaSearch className="absolute right-3 top-3 text-gray-500" />
              </div>
      
              {/* Filter Dropdown */}
              <div className="relative">
                <div className="=flex flex-row"> 
                <div>
                <span className="text-md font-semibold mr-2 text-gray-700">Filter:</span>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">All Categories</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Disputed">Disputed</option>
                </select>
                </div>
               <div>
               <span className="text-md font-semibold mr-2 text-gray-700">Filter:</span>
                <select
                  value={filterCategory1}
                  onChange={(e) => setFilterCategory1(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">All Categories</option>
                  <option value="Direct">Direct</option>
                  <option value="Escrow">Escrow</option>
                </select>
               </div>
                </div>
              </div>
      
              {/* Sort Dropdown */}
              <div className="relative">
                <span className="text-md font-semibold mr-2 text-gray-700">Sort:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="az">Title (A-Z)</option>
                  <option value="za">Title (Z-A)</option>
                </select>
              </div>
            </div>
      <h2 className='text-2xl font-bold mb-4'>Projects & Payments</h2>
      <table className='w-full mb-6 border'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='py-2 px-4'>Project Name</th>
            <th className='py-2 px-4'>Company Name</th>
            <th className='py-2 px-4'>Freelancer</th>
            <th className='py-2 px-4'>Budget</th>
            <th className='py-2 px-4'>Status</th>
            <th className='py-2 px-4'>Payment Mode</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.id} className='text-center hover:bg-gray-100'>
              <td className='py-2 px-4'>{project.projectName}</td>
              <td className='py-2 px-4'>{project.companyName}</td>
              <td className='py-2 px-4'>{project.freelancer}</td>
              <td className='py-2 px-4'>${project.budget}</td>
              <td className='py-2 px-4'>{project.status}</td>
              <td className='py-2 px-4'>{project.paymentMode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsAndPayments;