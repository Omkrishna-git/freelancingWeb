const Project = require("../models/Project");
const Freelancer = require('../models/Freelancer');
const mongoose = require('mongoose')

exports.createProject = async (req, res) => {
  try {
    const {
      title, description, techStack, deadline, cost,
      paymentMode, modeOfWork, status, companyId
    } = req.body;
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
  try {
    let query = { status: { $in: ["Accepted", "Completed", "In Progress"] } };
    let projects = await Project.find()
    .populate("freelancerId", "fullName email") // only select needed fields
    .populate("companyId", "organization email");
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};


exports.getAcceptedProjects = async (req, res) => {
  const { freelancerId } = req.query;
  
  if (!freelancerId) {
    return res.status(400).json({ error: "freelancerId is required" });
  }

  try {
    const projects = await Project.find({ status: "Accepted", acceptedFreelancer: freelancerId });
    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching accepted projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.getAvailableProjects = async (req, res) => {
  try {
    const freelancerId = req.user?.id; 
    let query = { status: "Open" };

    let projects = await Project.find(query);

    if (freelancerId) {
      projects = projects.filter(project =>
        !project.applicants.some(app =>
          app && app.freelancerId && app.freelancerId.toString() === freelancerId
        )
      );
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


// 1. Apply to Project
exports.applyToProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const freelancerId = req.user?.id || req.body.freelancerId;

    if (!freelancerId) {
      return res.status(400).json({ message: "Freelancer ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(freelancerId)) {
      return res.status(400).json({ message: "Invalid freelancer ID" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const alreadyApplied = project.applicants.some(
      app => app && app.freelancerId && app.freelancerId.toString() === freelancerId
    );
    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this project" });
    }

    project.applicants.push({
      freelancerId: new mongoose.Types.ObjectId(freelancerId),
      status: 'applied',
      appliedAt: new Date()
    });

    res.status(200).json({ message: "Applied successfully" });
  } catch (error) {
    console.error('Error applying to project:', error);  // 🔥 Log error
    res.status(500).json({ message: "Server error" });
  }
};



// 2. Get Freelancer's Applied Projects
exports.getAppliedProjects = async (req, res) => {
  try {
    const { freelancerId } = req.params;

    const projects = await Project.find({
      'applicants.freelancerId': freelancerId
    });
    const filtered = projects.filter(project =>
      Array.isArray(project.applicants) &&
      project.applicants.some(app =>
        app &&
        app.freelancerId &&
        app.status &&
        app.freelancerId.toString() === freelancerId &&
        app.status === 'applied'
      )
    );

    res.json({ projects: filtered });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// 3. Get Applicants for a Project (Company/Admin View)
exports.getApplicants = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId)
      .populate('applicants.freelancerId', 'name email phone skills');

    if (!project) return res.status(404).json({ msg: 'Project not found' });

    console.log("Applicants:", project.applicants); // <-- Add this

    res.json({ applicants: project.applicants });
  } catch (error) {
    console.error("Get applicants error:", error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// 4. Approve a Freelancer
exports.approveApplication = async (req, res) => {
  try {
    const { projectId, freelancerId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    project.acceptedFreelancer = freelancerId;
    project.status = 'Accepted';

    project.applicants = project.applicants.map(app => {
      if (app && app.freelancerId && app.freelancerId.toString() === freelancerId) {
        return { ...app.toObject(), status: 'accepted' };
      } else if (app) {
        return { ...app.toObject(), status: 'rejected' };
      }
      return app;
    });

    await project.save();

    res.json({ msg: 'Freelancer approved and project updated' });
  } catch (error) {
    console.error("Approve error:", error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// 5. Reject a Freelancer
exports.rejectApplication = async (req, res) => {
  try {
    const { projectId, freelancerId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    project.applicants = project.applicants.map(app => {
      if (app.freelancerId.toString() === freelancerId) {
        return { ...app.toObject(), status: 'rejected' };
      }
      return app;
    });

    await project.save();

    res.json({ msg: 'Application rejected' });
  } catch (error) {
    console.error("Reject error:", error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// exports.approveFreelancer = async (req, res) => {
//   try {
//     const { projectId, freelancerId } = req.params;
//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     // Accept the freelancer
//     let found = false;
//     project.applicants.forEach(app => {
//       if (app.freelancerId.toString() === freelancerId) {
//         app.status = "accepted";
//         found = true;
//       } else if (app.status === "accepted") {
//         app.status = "rejected"; // Only one accepted at a time
//       }
//     });
//     if (!found) return res.status(404).json({ message: "Applicant not found" });

//     project.acceptedFreelancer = freelancerId;
//     project.status = "Accepted";
//     await project.save();

//     res.json({ message: "Freelancer approved", project });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.rejectFreelancer = async (req, res) => {
//   try {
//     const { projectId, freelancerId } = req.params;
//     const project = await Project.findById(projectId);
//     if (!project) return res.status(404).json({ message: "Project not found" });

//     let found = false;
//     project.applicants.forEach(app => {
//       if (app.freelancerId.toString() === freelancerId) {
//         app.status = "rejected";
//         found = true;
//       }
//     });
//     if (!found) return res.status(404).json({ message: "Applicant not found" });

//     // If the rejected freelancer was the accepted one, clear acceptedFreelancer
//     if (project.acceptedFreelancer?.toString() === freelancerId) {
//       project.acceptedFreelancer = null;
//       project.status = "Open";
//     }
//     await project.save();

//     res.json({ message: "Freelancer rejected", project });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


