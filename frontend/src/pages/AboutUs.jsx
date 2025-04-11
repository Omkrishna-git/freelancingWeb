import React from "react";
import { FaArrowRight, FaStar, FaAward, FaCheckCircle, FaDollarSign } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
// import DemoImage2 from "../assets/project.png"; // Uncomment if needed

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 md:px-12">

      {/* -------------------- First Section -------------------- */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">

        {/* Left Section */}
        <div className="p-8 md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900">
            Why businesses turn to Upwork
          </h1>

          <div className="mt-6 space-y-6">

            {/* Proof of Quality */}
            <div className="flex items-start space-x-3">
              <MdVerified className="text-2xl text-green-600" />
              <div>
                <h3 className="font-bold text-gray-900">Proof of quality</h3>
                <p className="text-gray-600">
                  Check any pro’s work samples, client reviews, and identity verification.
                </p>
              </div>
            </div>

            {/* No Cost Until You Hire */}
            <div className="flex items-start space-x-3">
              <FaDollarSign className="text-2xl text-green-600" />
              <div>
                <h3 className="font-bold text-gray-900">No cost until you hire</h3>
                <p className="text-gray-600">
                  Interview potential fits for your job, negotiate rates, and only pay for work you approve.
                </p>
              </div>
            </div>

            {/* Safe and Secure */}
            <div className="flex items-start space-x-3">
              <FaCheckCircle className="text-2xl text-green-600" />
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
        <div className="md:w-1/2 bg-[#42554c] text-white p-8 flex flex-col justify-center items-center text-center">
          <h2 className="text-xl font-bold mt-4">We’re the world’s work marketplace</h2>

          {/* Rating */}
          <div className="mt-4">
            <p className="text-2xl font-semibold flex items-center justify-center gap-1">
              <FaStar className="text-yellow-400" /> 4.9/5
            </p>
            <p className="text-sm text-gray-200">Clients rate professionals on Upwork</p>
          </div>

          {/* Award */}
          <div className="mt-4">
            <p className="text-lg font-bold flex items-center justify-center gap-1">
              <FaAward className="text-yellow-300" /> Award winner
            </p>
            <p className="text-sm text-gray-200">G2’s 2021 Best Software Awards</p>
          </div>
        </div>
      </div>

      {/* -------------------- Second Section -------------------- */}
      <section className="bg-[#647e73] rounded-3xl px-10 py-16 text-center max-w-4xl mx-auto mt-16">
        <h2 className="text-4xl md:text-4xl font-bold text-[#21372e]">
          Things for freelancers
        </h2>
        <p className="text-3xl md:text-2xl mt-2 font-medium text-gray-700">
          sent to your inbox weekly
        </p>

        <form className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Your email"
            className="px-5 py-3 rounded border border-[#0e3423] focus:outline-none focus:ring-1 focus:ring-black w-full sm:w-80 text-lg"
          />
          <button
            type="submit"
            className="bg-[#293730] text-white px-5 py-3 rounded-xl text-lg font-semibold shadow-md flex items-center gap-2 hover:bg-gray-900 transition"
          >
            Subscribe <FaArrowRight />
          </button>
        </form>

        <p className="text-xl text-[#c8d5cf] mt-4">
          Join 4,000+ freelancers · Unsubscribe anytime
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
