import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gray-50 p-8 md:p-16 flex flex-col items-center">
      {/* Container for Boxes (Relative for Positioning) */}
      <div className="relative flex flex-col md:flex-row w-full max-w-5xl shadow-lg items-center">
        {/* Image Positioned in the Middle */}
        <img
          src="D:\Web dev\freelancingWeb\frontend\src\assets\aboutUs.png"
          alt="Illustration"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 z-10 bg-white p-2 rounded-full shadow-lg"
        />

        {/* Left Box */}
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Why businesses turn to Upwork
          </h1>

          {/* Feature List */}
          <div className="mt-6 space-y-6">
            {/* Proof of Quality */}
            <div className="flex items-start space-x-2">
              <span className="text-xl">✪</span>
              <div>
                <h3 className="font-bold text-gray-900">Proof of quality</h3>
                <p className="text-gray-600">
                  Check any pro’s work samples, client reviews, and identity verification.
                </p>
              </div>
            </div>

            {/* No Cost Until You Hire */}
            <div className="flex items-start space-x-2">
              <span className="text-xl">💲</span>
              <div>
                <h3 className="font-bold text-gray-900">No cost until you hire</h3>
                <p className="text-gray-600">
                  Interview potential fits for your job, negotiate rates, and only pay for work you approve.
                </p>
              </div>
            </div>

            {/* Safe and Secure */}
            <div className="flex items-start space-x-2">
              <span className="text-xl">✔</span>
              <div>
                <h3 className="font-bold text-gray-900">Safe and secure</h3>
                <p className="text-gray-600">
                  Focus on your work knowing we help protect your data and privacy. We’re here with 24/7 support if you need it.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Box */}
        <div className="w-full md:w-1/2 bg-green-600 text-white p-8 flex flex-col justify-center text-center">
          <h2 className="text-xl font-bold">We’re the world’s work marketplace</h2>

          {/* Rating */}
          <div className="mt-4">
            <p className="text-2xl font-semibold">⭐ 4.9/5</p>
            <p className="text-sm text-gray-200">
              Clients rate professionals on Upwork
            </p>
          </div>

          {/* Award */}
          <div className="mt-4">
            <p className="text-lg font-bold">🏆 Award winner</p>
            <p className="text-sm text-gray-200">G2’s 2021 Best Software Awards</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
