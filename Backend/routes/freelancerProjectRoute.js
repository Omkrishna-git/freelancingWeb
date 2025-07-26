const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getAcceptedProjects
} = require("../controllers/freelancerProjectController");
const { projectUpload } = require("../middlewares/multerMiddleware");

router.post("/createProject", verifyToken, projectUpload, createProject);
router.get("/", getProjects);
router.get("/accepted", getAcceptedProjects); // Get accepted projects
router.get("/available", getProjects); // Get available projects (you can modify this to filter based on your criteria)
router.get("/:id", getProjectById);
router.put("/:id", verifyToken, projectUpload, updateProject);
router.delete("/:id", verifyToken, deleteProject);
module.exports = router;
