const Company = require("../models/Company");
const Project = require("../models/Project");
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
      { expiresIn: "7d" }
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
          const companyId = req.user.id;

          const company = await Company.findById(companyId);

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

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(Array.isArray(companies) ? companies : []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCompanyProfile = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCompany);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

exports.getAcceptedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ companyId: req.params.id, status: 'Accepted' })
      .populate('acceptedFreelancer', 'name email phone skills profileImage title')
      .populate('author', 'name profileImage');
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No accepted projects found for this company" });
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getCompanyProjects = async (req, res) => {
  try {
    const companyId = req.user.id; // safer than req.query

    const projects = await Project.find({ companyId })
      .populate("acceptedFreelancer",  'name email phone skills profileImage title')
      .populate("applicants.freelancerId", 'name email phone skills profileImage title');
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No projects found for this company" });
    }
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getOngoingProjects = async (req, res) => {
  try {
    const companyId = req.user.id;

    // Fetch all projects for this company that are either Accepted or In Progress
    const projects = await Project.find({
      companyId: companyId,
      status: { $in: ["Accepted", "In Progress"] }
    })
      .populate("acceptedFreelancer", "name email skills phone profileImage title")
      .select("title description cost deadline techStack modeOfWork status agreement references createdAt updatedAt");

    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching ongoing projects:", err);
    res.status(500).json({ error: "Server error" });
  }
};



exports.getAllApplicantsForCompany = async (req, res) => {
  try {
    const companyId = req.user.id;

    const projects = await Project.find({ companyId }).populate({
      path: 'applicants.freelancerId',
      select: 'name email phone skills profileImage title'
    });

    const allApplicants = projects.flatMap(project =>
      project.applicants
        .filter(applicant => applicant.status === 'applied')  // ✅ Only those who applied
        .map(applicant => ({
          ...applicant.toObject(),
          projectId: project._id,
          projectTitle: project.title
        }))
    );

    res.status(200).json(allApplicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Server error" });
  }
};
