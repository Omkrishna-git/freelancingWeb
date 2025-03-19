import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FreelancerRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    gender: "",
    dob: null,
    location: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.fullname) newErrors.fullname = "Full name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.dob) newErrors.dob = "Please select your birth date";
    if (!formData.location) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const handleNext = () => {
    if (validate()) {
      navigate("/freelancer-skills");
    }
  };

  const handleBack = () => {
    navigate("/freelancer-registration");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Personal Details</h2>
        <hr className="border-gray-300 mb-4" />

        <div className="space-y-4">
          <div>
            <label className="font-semibold block">Fullname</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
            />
            {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
          </div>

          <div>
            <label className="font-semibold block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="font-semibold block">Mobile No</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Your Mobile No"
              className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>

          <div>
            <label className="font-semibold block">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          <div>
            <label className="font-semibold block">DOB</label>
            <DatePicker
              selected={formData.dob}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              placeholderText="Select your birth date"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          <div>
            <label className="font-semibold block">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Your Location"
              className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button 
          onClick={handleBack}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">Back</button>
          <button
            onClick={handleNext}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelancerRegistration;
