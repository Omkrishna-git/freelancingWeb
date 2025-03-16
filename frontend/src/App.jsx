import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Featured from "./components/Featured";
import Freelancers from "./components/freelancers";
import TopCust from "./components/topCust";
import Reviews from "./components/reviews";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs"; 
import Projects from "./pages/Projects"; 
import LoginPage from "./pages/LoginPage";
import "./App.css";

function App() {
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
        {/* Projects Page */}
        <Route path="/projects" element={<Projects />} />
        {/* About Us Page */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
