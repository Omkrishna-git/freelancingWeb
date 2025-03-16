import React from "react";
import DemoImage from "../assets/aboutUs.png";
import DemoImage2 from "../assets/project.png";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-12">
      {/* First Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="p-8 md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900">Why businesses turn to Upwork</h1>
          
          <div className="mt-6 space-y-6">
            {/* Proof of Quality */}
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✪</span>
              <div>
                <h3 className="font-bold text-gray-900">Proof of quality</h3>
                <p className="text-gray-600">Check any pro’s work samples, client reviews, and identity verification.</p>
              </div>
            </div>

            {/* No Cost Until You Hire */}
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💲</span>
              <div>
                <h3 className="font-bold text-gray-900">No cost until you hire</h3>
                <p className="text-gray-600">
                  Interview potential fits for your job, negotiate rates, and only pay for work you approve.
                </p>
              </div>
            </div>

            {/* Safe and Secure */}
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✔</span>
              <div>
                <h3 className="font-bold text-gray-900">Safe and secure</h3>
                <p className="text-gray-600">
                  Focus on your work knowing we help protect your data and privacy. We’re here with 24/7 support if you need it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 bg-green-600 text-white p-8 flex flex-col justify-center items-center text-center">
          <img src={DemoImage} alt="Illustration" className="w-48 h-auto" />
          <h2 className="text-xl font-bold mt-4">We’re the world’s work marketplace</h2>

          {/* Rating */}
          <div className="mt-4">
            <p className="text-2xl font-semibold">⭐ 4.9/5</p>
            <p className="text-sm text-gray-200">Clients rate professionals on Upwork</p>
          </div>

          {/* Award */}
          <div className="mt-4">
            <p className="text-lg font-bold">🏆 Award winner</p>
            <p className="text-sm text-gray-200">G2’s 2021 Best Software Awards</p>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="max-w-6xl mx-auto mt-12 flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section (Image) */}
        <div className="md:w-1/2">
          <img src={DemoImage2} alt="Freelancer" className="w-full h-full object-cover" />
        </div>

        {/* Right Section (Text) */}
        <div className="p-8 md:w-1/2 bg-green-500 text-white flex flex-col justify-center">
          <h2 className="text-xl font-bold">For talent</h2>
          <h1 className="text-3xl font-bold mt-2">Find great work</h1>
          <p className="mt-2 text-lg">
            Meet clients you’re excited to work with and take your career or business to new heights.
          </p>

          {/* Features */}
          <div className="mt-6 space-y-3">
            <p className="border-t pt-2">✅ Find opportunities for every stage of your freelance career</p>
            <p className="border-t pt-2">✅ Control when, where, and how you work</p>
            <p className="border-t pt-2">✅ Explore different ways to earn</p>
          </div>

          {/* Button */}
          <button className="mt-6 bg-white text-green-600 font-semibold px-6 py-2 rounded-full">
            Find opportunities
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
