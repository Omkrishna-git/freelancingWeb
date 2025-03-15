import React from "react";
import { FaDesktop, FaPenNib, FaCode, FaBullhorn, FaChartLine, FaVideo } from "react-icons/fa";

const categories = [
  { name: "Graphics & Design", icon: <FaPenNib className="text-gray-600 text-2xl mb-2" /> },
  { name: "Digital Marketing", icon: <FaBullhorn className="text-gray-600 text-2xl mb-2" /> },
  { name: "Writing & Translation", icon: <FaDesktop className="text-gray-600 text-2xl mb-2" /> },
  { name: "Programming & Tech", icon: <FaCode className="text-gray-600 text-2xl mb-2" /> },
  { name: "Business & Finance", icon: <FaChartLine className="text-gray-600 text-2xl mb-2" /> },
  { name: "Video & Animation", icon: <FaVideo className="text-gray-600 text-2xl mb-2" /> }
];

const Featured = () => {
  return (
    <div className="p-6 md:p-12">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Browse Talent by Category
      </h2>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 justify-center max-w-4xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center shadow-md w-full sm:w-60"
          >
            {category.icon}
            <h3 className="text-gray-700 font-medium text-sm">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* Statistics Section */}
      <div className="bg-green-100 rounded-xl p-8 mt-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left max-w-5xl mx-auto shadow-md gap-6">
        <div className="flex-1">
          <h4 className="text-xl font-bold text-green-800 whitespace-nowrap">3 Million+</h4>
          <p className="text-gray-600 text-sm">
            Verified freelancers, covering <span className="font-semibold">8,766 skills</span> worldwide.
          </p>
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold text-green-800 whitespace-nowrap">$150 Million+</h4>
          <p className="text-gray-600 text-sm">
            Earned by freelancers, with top professionals making over <span className="font-semibold">$7,000 per month</span>.
          </p>
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold text-green-800 whitespace-nowrap">10 Minutes</h4>
          <p className="text-gray-600 text-sm">
            Average time to hire, with <span className="font-semibold">90% of projects</span> completed within 7 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
