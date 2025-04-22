const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const {
      title, description, techStack, deadline, cost,
      paymentMode, modeOfWork, status, companyId
    } = req.body;

    // Parse techStack if it's a JSON string
    const parsedTechStack = typeof techStack === "string" ? JSON.parse(techStack) : techStack;

    const newProject = new Project({
      title,
      description,
      techStack: parsedTechStack,
      deadline,
      cost,
      paymentMode,
      modeOfWork,
      status,
      companyId,
      references: req.files?.references?.[0]
        ? {
            data: req.files.references[0].buffer,
            contentType: req.files.references[0].mimetype,
            filename: req.files.references[0].originalname,
          }
        : undefined,
      agreement: req.files?.agreement?.[0]
        ? {
            data: req.files.agreement[0].buffer,
            contentType: req.files.agreement[0].mimetype,
            filename: req.files.agreement[0].originalname,
          }
        : undefined,
    });

    await newProject.save();

    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getProjects = async (req, res) => {
    try 
    {
      const projects = await Project.find().sort({ createdAt: -1 });
      res.status(200).json(projects);
    } 
    catch (error) 
    {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
}

exports.getAvailableProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "Open" }).populate("companyId");

    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No open projects found" });
    }

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching available projects:", error);
    res.status(500).json({ message: "Failed to fetch available projects" });
  }
};

exports.acceptProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const freelancerId = req.user?._id || req.body.freelancerId; // from auth or request body

    if (!freelancerId) {
      return res.status(400).json({ message: "Freelancer ID is required" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.status !== "Open") {
      return res
        .status(400)
        .json({ message: "Project is already accepted or closed" });
    }

    // Optional: Check if already assigned to a freelancer
    if (project.acceptedFreelancer) {
      return res
        .status(400)
        .json({ message: "Project already assigned to a freelancer" });
    }

    project.status = "Accepted";
    project.acceptedFreelancer = freelancerId;

    await project.save();

    return res
      .status(200)
      .json({ message: "Project accepted successfully", project });
  } catch (error) {
    console.error("Error accepting project:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

