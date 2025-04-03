import { useState } from "react";
import { FaTrash, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../pages/RegistrationContext"; // Adjust the import path as necessary

export default function Step3() {
  const navigate = useNavigate();
  const { registrationData } = useRegistration();
  const [skills, setSkills] = useState([""]);
  const [languages, setLanguages] = useState([""]);
  const [categories, setCategories] = useState([""]);
  const [experience, setExperience] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [errors, setErrors] = useState({});
  const addSkill = () => setSkills([...skills, ""]);
  const addLanguage = () => setLanguages([...languages, ""]);
  const addCategory = () => setCategories([...categories, ""]);

  const handleChange = (setter, index, value) => {
    setter((prevList) => {
      const newList = [...prevList];
      newList[index] = value;
      return newList;
    });
  };
  
  const removeItem = (setter, index) => {
    setter((prevList) => prevList.filter((_, i) => i !== index));
  };

  
  const handleBack = () => {
    
    navigate("/freelancer-personal-details");
  }
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
      
      // Convert file to Base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setResume(reader.result);
      };
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (skills.length === 0 || skills[0] === "") newErrors.skills = "At least one skill is required.";
    if (!experience) newErrors.experience = "Experience is required.";
    if (!portfolio) newErrors.portfolio = "Portfolio link is required.";
    if (!github) newErrors.github = "GitHub link is required.";
    if (!linkedin) newErrors.linkedin = "LinkedIn link is required.";
    if (!resume) newErrors.resume = "Resume upload is required.";
    if (languages.length === 0 || languages[0] === "") newErrors.languages = "At least one language is required.";
    if (categories.length === 0 || categories[0] === "") newErrors.categories = "At least one category is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {

    if (!validateForm()) {
      console.error("Validation failed, errors: ", errors);
      return;
    }

    const freelancerData = {
      ...registrationData, 
      skills,
      experience,
      portfolio,
      github,
      linkedin,
      resume,
      languages,
      projectCategories: categories
    };

    console.log("Validation passed, submitting form data: ", freelancerData);

    try {
      const response = await fetch("http://localhost:8000/api/freelancers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(freelancerData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Freelancer registered successfully!");
        navigate("/login");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-4">Freelancer Profile</h2>
      <hr className="border-gray-300 mb-4" />

      {/* Skills */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">Skills</label>
        <div className="grid grid-cols-3 gap-2">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleChange(setSkills, index, e.target.value)}
                placeholder="Enter a skill"
                className="w-full p-2 border rounded mb-2"
              />
              <button onClick={() => removeItem(setSkills, index)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addSkill} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
          Add Skill
        </button>
      </div>

      {/* Years of Experience */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">Years of Experience</label>
        <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Years of Experience" className="w-full p-2 border rounded" />
        {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
      </div>

      {/* Portfolio Link */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">Portfolio Link</label>
        <input type="url" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="Portfolio Link" className="w-full p-2 border rounded" />
        {errors.portfolio && <p className="text-red-500 text-sm">{errors.portfolio}</p>}
      </div>

      {/* Resume Upload */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">Resume</label>
        <div className="flex items-center space-x-2 border p-2 rounded">
          <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="resumeUpload" onChange={handleResumeUpload} />
          <label htmlFor="resumeUpload" className="flex items-center cursor-pointer">
            <FaUpload className="text-blue-500 mr-2" />
            {resumeName ? resumeName : "Upload Resume"}
          </label>
        </div>
        {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}
      </div>

      {/* GitHub Link */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">GitHub Link</label>
        <input type="url" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="GitHub Link" className="w-full p-2 border rounded" />
      </div>

      {/* LinkedIn Link */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">LinkedIn Link</label>
        <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn Link" className="w-full p-2 border rounded" />
      </div>


      {/* Project Categories */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">Project Categories</label>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={category}
                onChange={(e) => handleChange(setCategories, index, e.target.value)}
                placeholder="e.g. Web Development"
                className="w-full p-2 border rounded mb-2"
              />
              <button onClick={() => removeItem(setCategories, index)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addCategory} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
          Add Category
        </button>
      </div>

      {/* Languages Spoken */}
      <div className="mb-4">
        <label className="block text-lg font-semibold">Languages Spoken</label>
        <div className="grid grid-cols-3 gap-2">
          {languages.map((language, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={language}
                onChange={(e) => handleChange(setLanguages, index, e.target.value)}
                placeholder="Enter a language"
                className="w-full p-2 border rounded mb-2"
              />
              <button onClick={() => removeItem(setLanguages, index)} className="text-red-500">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addLanguage} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
          Add Language
        </button>
      </div>

      {/* Terms & Conditions */}
      <div className="mb-4">
        <input type="checkbox" className="mr-2" /> I have read and agree to the Terms & Conditions.
      </div>

      <div className="mb-4">
        <input type="checkbox" className="mr-2" /> I acknowledge that my personal data will be processed in accordance with the Privacy Policy.
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
      <button 
          onClick={handleBack}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">Back</button>
      <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
          Register
      </button>
      </div>
    </div>
  );
}
