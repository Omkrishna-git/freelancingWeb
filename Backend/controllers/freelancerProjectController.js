const FreelancerProject = require("../models/FreelancerProject");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { file } = req;
    const imageUrl = file ? `/uploads/${file.filename}` : null;

    const projectData = {
      ...req.body,
      imageUrl,
    };

    const newProject = new FreelancerProject(projectData);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await FreelancerProject.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await FreelancerProject.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { file } = req;
    if (file) req.body.imageUrl = `/uploads/${file.filename}`;

    const updatedProject = await FreelancerProject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await FreelancerProject.findByIdAndDelete(req.params.id);
    if (!deletedProject)
      return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};
