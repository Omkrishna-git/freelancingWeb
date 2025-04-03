import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const FreelancerRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    skills: [""],
    experience: "",
    github: "",
    linkedin: "",
    portfolio: "",
    resume: null,
  });

  const handleChange = (data) => {
    setFormData({ ...formData, ...data });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/freelancers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Registration successful!");
      } else {
        console.error("Backend error:", result);
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {step === 1 && <Step1 nextStep={nextStep} handleChange={handleChange} />}
      {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} />}
      {step === 3 && <Step3 prevStep={prevStep} handleChange={handleChange} nextStep={handleSubmit} />}
    </div>
  );
};

export default FreelancerRegistration;
