import React from "react";
import leftImage from "../assets/image-left.png";
import rightImage from "../assets/image-right.png";

const Hero = () => {
  return (
    <section className="flex flex-col items-center text-center px-4 py-8 md:py-15">
      {/* Container */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-5xl flex flex-col md:flex-row items-center overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden md:flex flex-col space-y-4 p-4">
          <img
            src={leftImage}
            alt="left"
            className="w-35 h-100 rounded-lg object-cover"
          />
        </div>

        {/* Hero Content */}
        <div className="flex-1 p-6 md:p-12 text-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
            We connect people to{" "}
            <span className="text-[#00af46]">bring projects</span> to life
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Find high-quality talent or open jobs with the help of AI tools that
            keep you in control.
          </p>
          {/* Button */}
          <div className="mt-6">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full flex items-center mx-auto">
              ⭐ Powered by Advanced AI
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="hidden md:flex flex-col space-y-4 p-4">
          <img
            src={rightImage}
            alt="right"
            className="w-35 h-100 rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-center text-gray-700 space-y-4 md:space-y-0 md:space-x-4">
        <p className="text-lg">Top talent is in high demand.</p>
        <button className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold">
          Start Hiring
        </button>
      </div>
    </section>
  );
};

export default Hero;
