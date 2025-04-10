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


