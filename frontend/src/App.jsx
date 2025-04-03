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
import "./App.css";
import FreeLancerDashboard from "./pages/FreelancerDashboard";
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import Login from "./components/login";
import {RegistrationProvider} from "./pages/RegistrationContext"; // Adjust the import path as necessary  

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
 
  

  return (
    <RegistrationProvider>
    <Router>
      {/* Conditionally render Navbar based on login state */}
       <Navbar />

      <Routes>
  <Route path="/" element={<><Hero /><Featured /><Freelancers /><TopCust /><Reviews /></>} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/blog" element={<BlogPage />} />
  <Route path="/write-blog" element={<WriteBlog />} />
  <Route path="/company-registration" element={<CompanyRegistration />} />
  <Route path="/blog/:id" element={<BlogDetailsPage />} />
  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="/freelancer-registration" element={<Step1 />} />
  <Route path="/freelancer-personal-details" element={<Step2 />} />
  <Route path="/freelancer-skills" element={<Step3 />} />
  <Route path="/freelancer" element={<FreeLancerDashboard />} />
  <Route path="/company-login" element={<Login />} />

</Routes>

      <Footer />
    </Router>
  </RegistrationProvider>
  );
}

export default App;
