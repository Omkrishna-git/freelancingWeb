import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar" // Import Hero Section

const FreelancerDetails = () => {
  return (
    <div style={styles.dashboardContainer}>
   
      <Hero />
      <DetailsSection />
    </div>
  );
};

const DetailsSection = () => {
  const data = {
    labels: ["Completed Work", "Pending Work"],
    datasets: [
      {
        data: [70, 30], // Example data: 70% completed, 30% pending
        backgroundColor: ["#4CAF50", "#FF9800"], // Green & Orange
        hoverBackgroundColor: ["#45a049", "#e68900"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Freelancer Work Status</h2>
      <div style={styles.chartContainer}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

// Styles
const styles = {
  dashboardContainer: {
    maxWidth: "1200px", // Increased width for better layout
    width: "100%",
    margin: "auto",
    padding: "20px",
  },
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "20px auto",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  chartContainer: {
    width: "250px",
    height: "250px",
    margin: "0 auto",
  },
};

export default FreelancerDetails;
