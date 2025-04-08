
const Company = require("../models/Company");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerCompany = async (req, res) => {
  try {
    const { organization, email, password, contact, address } = req.body;

    // Validate required fields
    if (!organization || !email || !password || !contact || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already registered with this email" });
    }

    // Hash Password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new company
    const company = new Company({
      organization,
      email,
      password: hashedPassword, // Store hashed password
      contact,
      address,
    });

    await company.save();
    res.status(201).json({ message: "Company registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.loginCompany = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  const { email, password } = req.body;

  // Check if fields are empty
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Find company by email
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: company._id },
      process.env.JWT_SECRET ,
      { expiresIn: "1h" }
    );
    console.log("✅ Sending login payload:", {
      token,
      role: "company",
      model: "Company",
      userId: company._id,
    });
    
    res.json({
      token,
      role: "company",
      model: "Company",
      userId: company._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
