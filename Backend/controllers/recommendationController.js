const Freelancer = require("../models/Freelancer");
const Project = require("../models/Project");

exports.recommendProjects = async (req, res) => {
  try {
    const freelancerId = req.user?.id;
    if (!freelancerId) return res.status(401).json({ message: "Unauthorized" });

    const freelancer = await Freelancer.findById(freelancerId);
    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });

    const { skills = [], address = "" } = freelancer;

    const recommended = await Project.find({
      status: "Open",
      techStack: { $in: skills },
      $or: [
        { modeOfWork: "Remote" },
        { modeOfWork: "Hybrid" },
        { modeOfWork: "Onsite", address: { $regex: address, $options: "i" } }
      ]
    }).limit(10);

    res.json(Array.isArray(recommended) ? recommended : []);
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};