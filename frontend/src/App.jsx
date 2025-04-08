import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";  // Default Navbar (Before Login)
import { AuthProvider } from "./context/AuthContext"; 
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

  return (
    <AuthProvider>
      <RegistrationProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<><Hero /><Featured /><Freelancers /><TopCust /><Reviews /></>} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/loginPage" element={<LoginPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/write-blog" element={<WriteBlog />} />
            <Route path="/company-registration" element={<CompanyRegistration />} />
            <Route path="/blog/:id" element={<BlogDetailsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/freelancer-registration" element={<Step1 />} />
            <Route path="/freelancer-personal-details" element={<Step2 />} />
            <Route path="/freelancer-skills" element={<Step3 />} />
            <Route path="/freelancer" element={<FreeLancerDashboard />} />
            <Route path="/login/:role" element={<Login />} />
          </Routes>
        <Footer />
      </Router>
    </RegistrationProvider>
  </AuthProvider>
  );
}

export default App;
