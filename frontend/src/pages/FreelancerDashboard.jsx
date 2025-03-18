import React from "react";
import Navbar from "../components/NavbarLoggedIn";
import Hero from "../components/Hero";
import Freelancer from "../components/freelancers";

const FreeLancerDashboard = () => {
  return (
    <div>
      {/* Navbar at the top */}
      <Navbar />

      {/* Hero section below Navbar */}
      <Hero />

      {/* Freelancer section below Hero */}
      <Freelancer />
    </div>
  );
};

export default FreeLancerDashboard;
