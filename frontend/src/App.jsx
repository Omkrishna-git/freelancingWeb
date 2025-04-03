import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";  // Default Navbar (Before Login)

import Hero from "./components/Hero";
import Featured from "./components/Featured";
import Freelancers from "./components/freelancers";
import TopCust from "./components/topCust";
import Reviews from "./components/reviews";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs"; 
import Projects from "./pages/Projects"; 
import LoginPage from "./pages/LoginPage";
import BlogPage from "./pages/Blog";
import CompanyRegistration from "./pages/CompanyRegistration"; 
import WriteBlog from "./pages/WriteBlog"
import BlogDetailsPage from "./pages/display-blog";
import AdminDashboard from "./pages/AdminDashboard";
import FreelancerRegistration from "./pages/FreelancerRegistration";
import FreelancerRegistration01 from "./pages/FreelancerRegistration01";
import FreelancerRegistration02 from "./pages/FreelancerRegistration02";
import FreeLancerDashboard from "./pages/FreelancerDashboard";

import "./App.css";

function App() {
  // Authentication state (use localStorage to persist login state)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in when app loads
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle login/logout (example)
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Store login status
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Remove login status
  };

  return (
    <Router>
       <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Featured />
              <Freelancers />
              <TopCust />
              <Reviews />
            </>
          }
        />
        {/* Other Pages */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/write-blog" element={<WriteBlog />} />
        <Route path="/company-registration" element={<CompanyRegistration />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/freelancer-registration" element={<FreelancerRegistration />} />
        <Route path="/freelancer-personal-details" element={<FreelancerRegistration01 />} />
        <Route path="/freelancer-skills" element={<FreelancerRegistration02 />} />
        <Route path="/freelancer" element={<FreeLancerDashboard />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
