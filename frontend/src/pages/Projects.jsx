import React from "react";

const Projects = () => {
  const projects = [
    {
      title: "Design Responsive WordPress Website",
      category: ["Design", "HTML5"],
      price: "$900",
      img: "../assets/demo.jpeg",
    },
    {
      title: "SEO & Digital Marketing",
      category: ["SEO", "Marketing"],
      price: "$620",
      img: "../assets/demo.jpeg",
    },
    {
      title: "Web Development",
      category: ["React", "Node.js"],
      price: "$700",
      img: "../assets/demo.jpeg",
    },
  ];

  return (
    <div className="p-6 md:p-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Trending Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-6 shadow-md rounded-lg text-center">
            <img src={project.img} alt={project.title} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>
            <div className="flex justify-center gap-2 mt-2">
              {project.category.map((cat, idx) => (
                <span key={idx} className="bg-gray-200 text-sm px-3 py-1 rounded-full">
                  {cat}
                </span>
              ))}
            </div>
            <p className="mt-4 font-bold text-green-700">{project.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
