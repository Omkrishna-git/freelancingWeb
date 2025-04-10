import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalPopup from "./modalPopup";
import { FaGlobe } from "react-icons/fa";

const CompanyProfile = ({ isOpen, onClose }) => {
  const [company, setCompany] = useState({
    organization: "",
    email: "",
    contact: "",
    address: "",
    about: "",
    website: "",
    logo: "",
    projects: [],
    certifications: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [existingData, setExistingData] = useState("");
  const companyId = localStorage.getItem("userId");

  useEffect(() => {
    if (companyId) {
      axios
        .get(`http://localhost:8000/api/companies/${companyId}`)
        .then((res) => setCompany(res.data))
        .catch((err) => console.error("Error fetching company data", err));
    }
  }, [companyId]);

  const updateCompany = async (updateData) => {
    try {
      await axios.put(`http://localhost:8000/api/companies/${companyId}`, updateData);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleSave = (data) => {
    const updated = { ...company };
    if (modalType === "about") updated.about = data;
    else if (modalType === "projects") updated.projects.push(data);
    else if (modalType === "website") updated.website = data;

    setCompany(updated);
    updateCompany(updated);
    setModalOpen(false);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    const updatedCerts = [...company.certifications, ...files];
    setCompany({ ...company, certifications: updatedCerts });
    updateCompany({ certifications: updatedCerts });
  };

  if (!isOpen) return null;

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("logo", file);
  
    try {
      const res = await axios.put(
        `http://localhost:8000/api/companies/upload/logo/${companyId}`,
        formData
      );
      setCompany((prev) => ({ ...prev, logo: res.data.logo }));
    } catch (err) {
      console.error("Logo upload failed", err);
    }
  };

  return (
    <div className="absolute top-16 right-10 w-96 bg-white shadow-xl rounded-lg z-50">
      <div className="flex items-center p-5 bg-gray-100 rounded-t-lg">
      <label className="cursor-pointer">
        <img
            src={company.logo || "https://via.placeholder.com/150"}
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover border border-gray-300"/>
        <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}/>
        </label>
        <div>
          <h2 className="text-lg font-bold text-gray-800">{company.organization}</h2>
          <p className="text-sm text-gray-600">{company.email}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-md font-semibold text-gray-700">About</h3>
          <p className="text-sm text-gray-600 mt-1">{company.about || "No info yet."}</p>
          <button
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md"
            onClick={() => {
              setModalType("about");
              setExistingData(company.about);
              setModalOpen(true);
            }}
          >
            {company.about ? "Edit" : "+ Add About"}
          </button>
        </div>

        <div>
          <h3 className="text-md font-semibold text-gray-700">Website</h3>
          <a
            href={
              company.website?.startsWith("http")
                ? company.website
                : `https://${company.website}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 mt-1"
          >
            <FaGlobe /> {company.website || "No website added"}
          </a>
          <button
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md"
            onClick={() => {
              setModalType("website");
              setExistingData(company.website);
              setModalOpen(true);
            }}
          >
            {company.website ? "Edit" : "+ Add Website"}
          </button>
        </div>

        <div>
          <h3 className="text-md font-semibold text-gray-700">Projects</h3>
          {company.projects?.length > 0 ? (
            <ul className="text-sm text-gray-700 list-disc list-inside mt-1">
              {company.projects.map((proj, i) => (
                <li key={i}>{proj}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600">No projects added yet.</p>
          )}
          <button
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md"
            onClick={() => {
              setModalType("projects");
              setModalOpen(true);
            }}
          >
            + Add Project
          </button>
        </div>

        <div>
          <h3 className="text-md font-semibold text-gray-700">Certifications</h3>
          {company.certifications?.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {company.certifications.map((cert, i) => (
                <img
                  key={i}
                  src={cert}
                  className="w-20 h-20 object-cover rounded-md"
                  alt={`cert-${i}`}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No certifications yet.</p>
          )}
          <label className="block mt-2">
            <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">
              Upload Certificate
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </span>
          </label>
        </div>
      </div>

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

export default CompanyProfile;
