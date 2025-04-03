const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Freelancer = require("../models/Freelancer");

// Register Freelancer
exports.registerFreelancer = async (req, res) => {
  try {
       const { fullName, email, password, gender, phone, dob, address, skills, experience, github, portfolio, linkedin, resume, languages, projectCategories } = req.body;

    // Check for missing fields
    if (!fullName || !email || !password || !gender || !phone || !dob || !address || !skills || !experience || !languages || !projectCategories) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Check if freelancer exists
    const existingFreelancer = await Freelancer.findOne({ email });
    if (existingFreelancer) return res.status(400).json({ error: "Email already in use" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newFreelancer = new Freelancer({
      fullName,
      email,
      password: hashedPassword,
      gender,
      phone,
      dob,
      address,
      skills,
      experience,
      github,
      portfolio,
      linkedin,
      resume,
      languages,
      projectCategories
    });

    await newFreelancer.save();
    res.status(201).json({ message: "Freelancer registered successfully" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};


// Freelancer Login
exports.loginFreelancer = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  try {
    const { email, password } = req.body;
    const freelancer = await Freelancer.findOne({ email });

    if (!freelancer) return res.status(400).json({ error: "Freelancer not found" });

    const isMatch = await bcrypt.compare(password, freelancer.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: freelancer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, freelancer });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
