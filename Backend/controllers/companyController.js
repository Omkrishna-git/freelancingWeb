
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



exports.getCompanyById = async (req, res) => {
  try {

    const company = await Company.findById(req.params.id);

    if (!company) return res.status(404).json({ message: "Company not found" });

    // Send base64 encoded logo (for frontend image preview)
    const companyData = company.toObject();
    if (company.logo && company.logo.data) {
      companyData.logo = `data:${company.logo.contentType};base64,${company.logo.data.toString("base64")}`;
    } else {
      companyData.logo = null;
    }

    res.json(companyData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update company profile
exports.updateCompanyProfile = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCompany);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload logo and store as buffer
exports.uploadCompanyLogo = async (req, res) => {
  try {
    const logoBuffer = req.file.buffer;
    const contentType = req.file.mimetype;

    const updated = await Company.findByIdAndUpdate(
      req.params.id,
      { logo: { data: logoBuffer, contentType: contentType } },
      { new: true }
    );

    const updatedObj = updated.toObject();
    updatedObj.logo = `data:${updated.logo.contentType};base64,${updated.logo.data.toString("base64")}`;

    res.json(updatedObj);
  } catch (err) {
    res.status(500).json({ message: "Failed to upload logo", error: err.message });
  }
};