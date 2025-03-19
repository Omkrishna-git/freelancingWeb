import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input
  };

  // Validate Form
  const validate = () => {
    let newErrors = {};

    // Fullname Validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Fullname is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Fullname must be at least 3 characters";
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm Password Validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next Button
  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/freelancer-personal-details");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Freelancer Registration</h1>
        <hr className="border-gray-300 my-4" />

        <form>
          {/* Fullname */}
          <div className="mb-4">
            <label className="block text-lg font-semibold">Fullname</label>
            <input
              type="text"
              name="fullName"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:outline-none"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-lg font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:outline-none"
              value={formData.email}
              onChange={handleChange}
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

          {/* Next Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleNext}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
