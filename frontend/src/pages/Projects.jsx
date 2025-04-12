import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaPlus, FaStar } from "react-icons/fa";
import DemoImage from "../assets/project.png";
import DemoImage2 from "../assets/demo.png";
import { Link } from "react-router-dom";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const userModel = localStorage.getItem("userModel");
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/freelancerprojects/", {
          withCredentials: true,
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let updatedProjects = projects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterCategory) {
      updatedProjects = updatedProjects.filter((project) =>
        project.categories.includes(filterCategory)
      );
    }

    if (sort === "asc") {
      updatedProjects.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      updatedProjects.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      updatedProjects.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setFilteredProjects(updatedProjects);
  }, [searchTerm, filterCategory, sort, projects]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 ">
      {/* Filter & Sort Controls */}
      <div className="relative text-center mb-5">
              <h1 className="text-3xl font-bold text-green-900 ">Projects</h1>
              <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                Everything you need to know to grow your business...
              </p>
        {userModel === "Company" && (
          <Link
            to="/add-freelancerproject"
            className="absolute top-0 right-1 text-gray p-3 rounded-full hover:bg-green-800 transition"
          >
            <FaPlus className="text-xl" />
          </Link>
        )}
        
      
            </div>
      
      <div className="flex flex-wrap justify-between items-center mb-6">
        {/* Search Bar */}
        <div className="relative w-full sm:w-1/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute right-3 top-3 text-gray-500">🔍</span>
        </div>
        {/* Filter by Category */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-lg font-semibold text-gray-700">Filter:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
          >
            <option value="">All Categories</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>



        {/* Sort by Option */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-4 sm:mt-0">
          <span className="text-lg font-semibold text-gray-700">Sort:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
          >
            <option value="newest">Newest</option>
            <option value="asc">Price (Low to High)</option>
            <option value="desc">Price (High to Low)</option>
          </select>
        </div>
      </div>


      {/* Project Grid */}
      <div className="grid md:grid-cols-3 gap-6">
      {filteredProjects.length > 0 ? (
  filteredProjects.map((project) => (
    <div
      key={project._id}
      className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105"
    >
      <img
        src={DemoImage}
        alt={project.title}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h2 className="mt-4 text-lg font-semibold text-gray-900">
        {project.title}
      </h2>

      <div className="flex flex-wrap gap-2 mt-3">
        {(project.techStack || []).map((tech, index) => (
          <span
            key={index}
            className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={project.author?.profileImage || DemoImage2}
            alt={project.author?.name || "Author"}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-gray-700">
            {project.author?.name || "Unknown"}
          </span>
        </div>
        <span className="text-lg font-bold text-gray-900">
          ${project.cost || project.price || 0}
        </span>
      </div>

      <div className="mt-2 flex items-center">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span
              key={i}
              className={`${
                i < Math.floor(project.rating || 0)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        <span className="ml-2 text-sm text-gray-600">
          ({(project.rating || 0).toFixed(1)})
        </span>
      </div>
    </div>
  ))
) : (
  <p className="text-gray-600 text-center col-span-3">
    No projects found
  </p>
)}
      </div>
    </div>
  );
};

export default Projects;
