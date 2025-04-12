const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/freelancerProjectController");
const { projectUpload } = require("../middlewares/multerMiddleware");

router.post("/createProject", verifyToken, projectUpload, createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", verifyToken, projectUpload, updateProject);
router.delete("/:id", verifyToken, deleteProject);

module.exports = router;
