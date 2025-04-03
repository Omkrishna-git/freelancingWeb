import React, { useState } from "react";

const FreelancerDetails = () => {
  const [activeTab, setActiveTab] = useState("pastWork");

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("pastWork")}
          style={{ background: activeTab === "pastWork" ? "green" : "lightgray", color: "white", padding: "10px", border: "none", cursor: "pointer" }}
        >
          Past Work
        </button>
        <button
          onClick={() => setActiveTab("pendingAmount")}
          style={{ background: activeTab === "pendingAmount" ? "green" : "lightgray", color: "white", padding: "10px", border: "none", cursor: "pointer" }}
        >
          Pending Amount/Project
        </button>
        <button
          onClick={() => setActiveTab("companies")}
          style={{ background: activeTab === "companies" ? "green" : "lightgray", color: "white", padding: "10px", border: "none", cursor: "pointer" }}
        >
          Companies Worked For
        </button>
      </div>

      {/* Content Section */}
      <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "5px" }}>
        {activeTab === "pastWork" && <p>Show past work details here...</p>}
        {activeTab === "pendingAmount" && <p>Show pending amount & projects here...</p>}
        {activeTab === "companies" && <p>List of companies worked for...</p>}
      </div>

      {/* Search & Filter Section */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{ padding: "10px", width: "100%", border: "1px solid gray", borderRadius: "5px" }}
        />
      </div>
    </div>
  );
};

export default FreelancerDetails;
