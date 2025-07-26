const express = require("express");
const router = express.Router();
const path = require("path");

const { 
  createProject, 
  getProjects, 
  getAvailableProjects,
  acceptProject,
  getAcceptedProjects,
  applyToProject,
  getAppliedProjects,
  getApplicants,
  approveApplication,
  rejectApplication,
} = require("../controllers/projectController");

const { projectUpload } = require("../middlewares/multerMiddleware");
const verifyToken = require("../middlewares/verifyToken");

// Routes
router.post("/createProject", verifyToken, projectUpload, createProject);
router.get("/", getProjects);
router.get("/available", getAvailableProjects);
router.get("/accepted", getAcceptedProjects); // Get accepted projects
router.put("/accept/:projectId", verifyToken, acceptProject); 
router.get('/applied/:freelancerId', getAppliedProjects);
router.get('/applicants/:projectId', getApplicants);
router.put('/approve/:projectId/:freelancerId', verifyToken, approveApplication);
router.put('/reject/:projectId/:freelancerId', verifyToken, rejectApplication);
router.post('/apply/:projectId', verifyToken, applyToProject);


module.exports = router;
