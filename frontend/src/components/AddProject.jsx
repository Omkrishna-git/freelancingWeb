import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    deadline: "",
    cost: "",
    paymentMode:  "Through this platform",
    references: null,
    agreement: null,
    modeOfWork: "Remote",
    status: "Open",
    companyId: userId,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = new FormData();
  
      const formattedFormData = {
        ...formData,
        status: "Open", 
      };
      const techStackArray = formData.techStack.split(',').map(item => item.trim());
      delete formattedFormData.techStack;
  
      for (let key in formattedFormData) {
        if (formattedFormData[key] !== null && formattedFormData[key] !== undefined) {
          data.append(key, formattedFormData[key]);
        }
      } 
   
      techStackArray.forEach(tech => data.append('techStack', tech));
  
      const response = await fetch("http://localhost:8000/api/projects/createProject", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data,
        credentials: "include",
      });
  
      const resData = await response.json();
  
      if (!response.ok) {
        console.error("Project creation failed:", resData);
        alert("Failed to create project. " + (resData.message || "Check console for details."));
        return;
      }
  
      alert("Project created successfully!");
      navigate("/projects");
  
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
    <div>
        <label className="block mb-1 font-semibold">Project title</label>
        <input name="title" onChange={handleChange}  required className="w-full border mb-4 px-4 py-2 rounded" />
    </div>
    <div>
      <label className="block mb-1 font-semibold">Project Description</label>
      <textarea name="description" onChange={handleChange} required className="w-full border mb-4 px-4 py-2 rounded" />  
    </div>
    <div>
       <label className="block mb-1 font-semibold">Techstack required:</label>
      <input name="techStack" onChange={handleChange} placeholder="React, Express, ...." required className="w-full border mb-4 px-4 py-2 rounded" />
    </div>
    <div>
      <label className="block mb-1 font-semibold">Project Deadline    </label>
      <input type="date" name="deadline" onChange={handleChange} required className="w-full border mb-4 px-4 py-2 rounded" />
    </div>
      
    <div>
      <label className="block mb-1 font-semibold">Project Cost</label>
      <input type="number" name="cost" onChange={handleChange} placeholder="Cost" required className="w-full border mb-4 px-4 py-2 rounded" />
    </div>
    <div>
          <label className="block mb-1 font-semibold">Payment Mode</label>
          <select
            name="paymentMode"
            onChange={handleChange}
            value={formData.paymentMode}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="Through this platform">Through this platform</option>
            <option value="Independent of platform">Independent of platform</option>
          </select>
      </div>
      <div>
          <label className="block mb-1 font-semibold">Mode of Work</label>
          <select
            name="modeOfWork"
            onChange={handleChange}
            value={formData.modeOfWork}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Reference Document (optional)</label>
        <input type="file" name="references" onChange={handleChange} className="w-full border px-4 py-2 rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Agreement File (optional)</label>
        <input type="file" name="agreement" onChange={handleChange} className="w-full border px-4 py-2 rounded" />
      </div>

      <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
        Submit Project
      </button>
    </form>
  );
};

export default AddProject;
