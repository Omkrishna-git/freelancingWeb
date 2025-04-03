import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organization: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.organization.trim()) newErrors.organization = "Organization name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact number must be 10 digits";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!validateForm()) {
      console.error("Validation failed, errors: ", errors);
      return;
    }
    console.log("Validation passed, submitting form data: ", formData);

    try {
      const response = await fetch("http://localhost:8000/api/companies/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Company registered successfully!");
        navigate("/login");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Company Registration</h2>
        <form onSubmit={handleSubmit}>
          {/* Organization Name */}
          <div className="mb-4">
            <label className="block text-lg font-semibold">Organization Name</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Name of Organization"
              className="w-full p-3 border rounded-lg focus:outline-none"
            />
            {errors.organization && <p className="text-red-500 text-sm">{errors.organization}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-lg font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Work Email Address"
              className="w-full p-3 border rounded-lg focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-lg font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Your Password"
              className="w-full p-3 border rounded-lg focus:outline-none"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-lg font-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-lg focus:outline-none"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          {/* Contact No */}
          <div className="mb-4">
            <label className="block text-lg font-semibold">Contact No</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full p-3 border rounded-lg focus:outline-none"
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-lg font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-3 border rounded-lg focus:outline-none"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          {/* Submit & Reset Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button type="reset" className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
              Reset
            </button>
            <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistration;
