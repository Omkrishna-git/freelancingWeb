import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ModalPopup from "./modalPopup";

const ProfileWindow = ({ isOpen, onClose }) => {
  const [about, setAbout] = useState("");
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [existingData, setExistingData] = useState("");

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const newCerts = Array.from(files).map((file) => URL.createObjectURL(file));
      setCertifications((prev) => [...prev, ...newCerts]);
    }
  };

  const handleSave = (data) => {
    console.log("🔹 Saving Data for:", modalType, " Value:", data); // Debugging

    if (modalType === "about") {
      setAbout(data);
    } else if (modalType === "education") {
      setEducation((prev) => [...prev, data]); // ✅ Fix: Use functional update
    } else if (modalType === "skills") {
      setSkills((prev) => [...prev, data]); // ✅ Fix: Use functional update
    }

    setModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-10 w-96 bg-white shadow-xl rounded-lg z-50">
      {/* Header */}
      <div className="flex items-center p-5 bg-gray-100 rounded-t-lg">
        <img src="https://via.placeholder.com/50" alt="Profile" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h2 className="text-lg font-bold text-gray-800">John Doe</h2>
          <p className="text-sm text-gray-500">Software Developer</p>
        </div>
        <button onClick={onClose} className="ml-auto text-gray-500 hover:text-red-500 text-xl">
          ✕
        </button>
      </div>

      <div className="p-5">
        {/* Quick Links */}
        <h3 className="text-md font-semibold mb-3 text-gray-700">Quick Links</h3>
        <div className="flex space-x-3 mb-4">
          <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
            <FaGithub className="mr-2" /> GitHub
          </button>
          <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
            <FaLinkedin className="mr-2" /> LinkedIn
          </button>
        </div>

        {/* About Section */}
        <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-4">
          <h3 className="text-md font-semibold text-gray-700">About</h3>
          <p className="text-sm text-gray-600 mt-1">{about || "No details added yet."}</p>
          <button
            className="mt-3 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            onClick={() => {
              setModalType("about");
              setExistingData(about);
              setModalOpen(true);
            }}
          >
            {about ? "Edit About" : "+ Add About"}
          </button>
        </div>

        {/* Education Section */}
        <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-4">
          <h3 className="text-md font-semibold text-gray-700">Education</h3>
          {education.length > 0 ? (
            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
              {education.map((edu, index) => (
                <li key={index}>{edu}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 mt-2">No education details added yet.</p>
          )}
          <button
            className="mt-3 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            onClick={() => {
              setModalType("education");
              setModalOpen(true);
            }}
          >
            + Add Education
          </button>
        </div>

        {/* Skills Section */}
        <div className="bg-gray-50 p-4 rounded-md shadow-sm mb-4">
          <h3 className="text-md font-semibold text-gray-700">Skills</h3>
          {skills.length > 0 ? (
            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 mt-2">No skills added yet.</p>
          )}
          <button
            className="mt-3 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            onClick={() => {
              setModalType("skills");
              setModalOpen(true);
            }}
          >
            + Add Skills
          </button>
        </div>

        {/* Certifications Section */}
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <h3 className="text-md font-semibold text-gray-700">Certifications</h3>
          {certifications.length > 0 ? (
            <div className="grid grid-cols-3 gap-3 mt-3">
              {certifications.map((cert, index) => (
                <img key={index} src={cert} alt={`Cert ${index}`} className="w-20 h-20 object-cover rounded-md shadow-md" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600 mt-2">No certifications added yet.</p>
          )}

          <label className="block mt-3">
            <span className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md cursor-pointer transition inline-block">
              Upload Certificate
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </span>
          </label>
        </div>
      </div>

      {/* Modal Popup */}
      <ModalPopup
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        title={`Add ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
        existingData={existingData}
        placeholder={`Enter ${modalType}`}
      />
    </div>
  );
};

export default ProfileWindow;
