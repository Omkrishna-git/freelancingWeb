const FreelancerProject = require("../models/FreelancerProject");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { file } = req;

    // Ensure image was uploaded
    if (!file) {
      return res.status(400).json({ message: "Image is required." });
    }

    const imageUrl = `/uploads/${file.filename}`;

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


// Get accepted projects
exports.getAcceptedProjects = async (req, res) => {
  try {
    //projects with status as accepted and freelancerId as request.user._id
    const freelancerId = req.user?._id || req.body.freelancerId; // from auth or request body
    if (!freelancerId) {
      return res.status(400).json({ message: "Freelancer ID is required" });
    }
    const projects = await FreelancerProject.find({
      status: "Accepted",  
      freelancerId: freelancerId // filter by freelancerId
    });
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "No accepted projects are found" });
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
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
    console.log(project);
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
