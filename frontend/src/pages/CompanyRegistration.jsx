import { useState } from "react";

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
    organization: "",
    email: "",
    password: "",
    confirmPassword: "",
    workplace: "",
    contact: "",
    agreeToEmails: false,
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  const handleReset = () => {
    setFormData({
      organization: "",
      email: "",
      password: "",
      confirmPassword: "",
      workplace: "",
      contact: "",
      agreeToEmails: false,
      agreeToTerms: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        {/* Form Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Company Registration
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Organization Name */}
          <div className="mb-4">
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Name of Organization"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Work Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Work Email Address"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Workplace & Contact */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="workplace"
              value={formData.workplace}
              onChange={handleChange}
              placeholder="Work Place"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Checkboxes */}
          <div className="mb-4 text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="agreeToEmails"
                checked={formData.agreeToEmails}
                onChange={handleChange}
                className="mr-2"
              />
              Send me emails with tips on how to find talent that fits my needs.
            </label>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mr-2"
                required
              />
              Yes, I understand and agree to the{" "}
              <a href="#" className="text-green-600 underline mx-1">
                Terms of Service
              </a>
              , including the{" "}
              <a href="#" className="text-green-600 underline">User Agreement</a> and{" "}
              <a href="#" className="text-green-600 underline">Privacy Policy</a>.
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistration;
