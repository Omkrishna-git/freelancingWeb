import { useState, useEffect } from "react";
import DemoImage from "../assets/project.png";
import DemoImage2 from "../assets/demo.png";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [filteredProjects, setFilteredProjects] = useState([]);
 
  const projects = [
    {
      id: 1,
      title: "Design Responsive, SEO friendly & Fast Loading WordPress website",
      tags: ["Design", "Logo Design", "HTML 5"],
      price: 600,
      author: "Maxi Limit",
      rating: 4.5,
      img: DemoImage,
      category: "Design",
    },
    {
      id: 2,
      title: "Modern UI/UX Design for Mobile & Web",
      tags: ["UI/UX", "Adobe XD", "Figma"],
      price: 750,
      author: "Jane Doe",
      rating: 4.8,
      img: DemoImage,
      category: "Design",
    },
    {
      id: 3,
      title: "E-commerce Website Development with React & Node.js",
      tags: ["E-commerce", "React", "Node.js"],
      price: 1200,
      author: "John Smith",
      rating: 4.9,
      img: DemoImage,
      category: "Development",
    },
    {
      id: 4,
      title: "SEO Optimization & Speed Enhancement",
      tags: ["SEO", "Marketing", "Web Performance"],
      price: 500,
      author: "Anna Brown",
      rating: 4.2,
      img: DemoImage,
      category: "Marketing",
    },
    {
      id: 5,
      title: "Mobile App Development with Flutter & Firebase",
      tags: ["Mobile Apps", "Flutter", "Firebase"],
      price: 1000,
      author: "Emily Davis",
      rating: 4.7,
      img: DemoImage,
      category: "Development",
    },
  ];

  useEffect(() => {
    let updatedProjects = projects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterCategory) {
      updatedProjects = updatedProjects.filter(
        (project) => project.category === filterCategory
      );
    }

    if (sort === "asc") {
      updatedProjects.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      updatedProjects.sort((a, b) => b.price - a.price);
    }

    setFilteredProjects(updatedProjects);
  }, [searchTerm, filterCategory, sort]); 

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Filters & Sorting Section */}
      <div className="flex flex-wrap justify-between items-center m-4">
        {/* Filter Dropdown */}
        <div className="relative flex flex-col sm:flex-row sm:items-center">
          <span className="text-lg font-semibold mr-4 text-gray-700">
            🎨 Filter Projects:
          </span>
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 pr-10 text-gray-700 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white focus:ring-2 focus:ring-green-400 focus:outline-none transition duration-300"
            >
              <option value="">All Categories</option>
              <option value="Design"> Design</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
            </select>
            {/* Down Arrow Icon */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              
            </div>
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div className="relative flex flex-col sm:flex-row sm:items-center">
          <span className="text-lg font-semibold mr-4 text-gray-700">
            📊 Sort Projects:
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 pr-10 text-gray-700 border border-gray-300 rounded-lg shadow-sm appearance-none bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
            >
              <option value="newest">Newest</option>
              <option value="asc">Price (Low to High)</option>
              <option value="desc">Price (High to Low)</option>
            </select>
            {/* Down Arrow Icon */}
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105"
            >
              {/* Project Image */}
              <img
                src={project.img || "https://via.placeholder.com/400"}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg"
              />

              {/* Project Title */}
              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                {project.title}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author & Price */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={DemoImage2} // Corrected JSX syntax
                    alt={project.author}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-700">
                    {project.author}
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  ${project.price}
                </span>
              </div>

              {/* Ratings */}
              <div className="mt-2 flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-500 ${
                        i < Math.floor(project.rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({project.rating})
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No projects found</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
