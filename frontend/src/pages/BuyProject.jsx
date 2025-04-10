import React from "react";

const projects = [
  {
    title: "Web Dev",
    desc: "Dynamic web application for e-commerce, CMS, etc.",
    category: "Web Development",
    rating: 3,
    price: 200,
  },
  {
    title: "Machine Learning",
    desc: "Model building for classification tasks.",
    category: "Machine Learning",
    rating: 4,
    price: 400,
  },
  {
    title: "DevOps",
    desc: "CI/CD pipelines, containerization, infra automation.",
    category: "DevOps",
    rating: 5,
    price: 600,
  },
];

export default function BuyProject() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-6">Buy a Project</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow">
            <div className="text-center mb-2 font-semibold">{project.title}</div>
            <p className="text-sm mb-2">{project.desc}</p>
            <div className="text-xs mb-1">Category: {project.category}</div>
            <div className="mb-2 text-yellow-500">
              {"⭐".repeat(project.rating)}{"☆".repeat(5 - project.rating)}
            </div>
            <button className="bg-green-500 text-white w-full py-2 rounded">
              Buy at ₹{project.price}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <span className="text-sm">0 items in cart</span>
        <button className="text-blue-600 underline">View Cart →</button>
      </div>
    </div>
  );
}
