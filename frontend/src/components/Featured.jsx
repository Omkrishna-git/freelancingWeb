import React, { useEffect, useRef, useState } from "react";
import {
  FaDesktop,
  FaPenNib,
  FaCode,
  FaBullhorn,
  FaChartLine,
  FaVideo,
} from "react-icons/fa";
import { useInView } from "framer-motion";

const categories = [
  {
    name: "Graphics & Design",
    icon: <FaPenNib className="text-gray-600 text-2xl mb-2" />,
  },
  {
    name: "Digital Marketing",
    icon: <FaBullhorn className="text-gray-600 text-2xl mb-2" />,
  },
  {
    name: "Writing & Translation",
    icon: <FaDesktop className="text-gray-600 text-2xl mb-2" />,
  },
  {
    name: "Programming & Tech",
    icon: <FaCode className="text-gray-600 text-2xl mb-2" />,
  },
  {
    name: "Business & Finance",
    icon: <FaChartLine className="text-gray-600 text-2xl mb-2" />,
  },
  {
    name: "Video & Animation",
    icon: <FaVideo className="text-gray-600 text-2xl mb-2" />,
  },
];

// Counter animation hook
const useCounter = (end, inView, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 20);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 20);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return count;
};

const Featured = () => {
  const statsRef = useRef(null);
  const inView = useInView(statsRef, { once: true });

  const freelancers = useCounter(3000000, inView);
  const earnings = useCounter(150000000, inView);
  const minutes = useCounter(10, inView);

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
            <h3 className="text-gray-700 font-medium text-sm">
              {category.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Statistics Section */}
      {/* Statistics Section */}
      <div
        ref={statsRef}
        className="bg-green-100 rounded-xl p-8 mt-12 flex flex-col md:flex-row items-center justify-between text-center max-w-5xl mx-auto shadow-md gap-6"
      >
        <div className="flex-1 flex flex-col items-center">
          <h4 className="text-3xl font-bold text-green-800 whitespace-nowrap">
            {freelancers.toLocaleString()}+
          </h4>
          <p className="text-gray-600 text-sm mt-1">
            Verified freelancers, covering{" "}
            <span className="font-semibold">8,766 skills</span> worldwide.
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <h4 className="text-3xl font-bold text-green-800 whitespace-nowrap">
            ${earnings.toLocaleString()}+
          </h4>
          <p className="text-gray-600 text-sm mt-1">
            Earned by freelancers, with top professionals making over{" "}
            <span className="font-semibold">$7,000 per month</span>.
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <h4 className="text-3xl font-bold text-green-800 whitespace-nowrap">
            {minutes} Minutes
          </h4>
          <p className="text-gray-600 text-sm mt-1">
            Average time to hire, with{" "}
            <span className="font-semibold">90% of projects</span> completed
            within 7 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
