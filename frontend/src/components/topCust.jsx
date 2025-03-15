import React from "react";
import BBC from "../assets/BBC.png";
import BusinessInsider from "../assets/BusinessInsider.png";

const TopCust = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">TRUSTED BY</h2>

        {/* Logo Container */}
        <div className="bg-gray-100 rounded-xl py-6 px-4 flex flex-wrap justify-center items-center gap-8 md:gap-12 shadow-md">
          <img src={BBC} alt="BBC" className="h-8 md:h-10 object-contain" />
          <img src={BusinessInsider} alt="Business Insider" className="h-8 md:h-10 object-contain" />
          <img src={BBC} alt="BBC" className="h-8 md:h-10 object-contain" />
          <img src={BusinessInsider} alt="Business Insider" className="h-8 md:h-10 object-contain" />
          <img src={BBC} alt="BBC" className="h-8 md:h-10 object-contain" />
          <img src={BusinessInsider} alt="Business Insider" className="h-8 md:h-10 object-contain" />
          <img src={BBC} alt="BBC" className="h-8 md:h-10 object-contain" />
          <img src={BusinessInsider} alt="Business Insider" className="h-8 md:h-10 object-contain" />
          <img src={BBC} alt="BBC" className="h-8 md:h-10 object-contain" />
          <img src={BusinessInsider} alt="Business Insider" className="h-8 md:h-10 object-contain" />
          <img src={BBC} alt="BBC" className="h-8 md:h-10 object-contain" />
          <img src={BusinessInsider} alt="Business Insider" className="h-8 md:h-10 object-contain" />
          <img src={BBC} alt="BBC" className="h-8 md:h-10 object-contain" />
          <img src={BusinessInsider} alt="Business Insider" className="h-8 md:h-10 object-contain" />
          <img src={BBC} alt="BBC" className="h-8 md:h-10 object-contain" />
          <img src={BusinessInsider} alt="Business Insider" className="h-8 md:h-10 object-contain" />
          <img src={BBC} alt="BBC" className="h-8 md:h-10 object-contain" />
          <img src={BusinessInsider} alt="Business Insider" className="h-8 md:h-10 object-contain" />
          {/* Add other images similarly */}
        </div>
      </div>
    </section>
  );
};

export default TopCust;
