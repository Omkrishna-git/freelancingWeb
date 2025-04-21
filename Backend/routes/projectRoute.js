const express = require("express");
const router = express.Router();
const path = require("path");

const verifyToken = require("../middlewares/verifyToken");
const { 
  createProject, 
  getProjects, 
  getAvailableProjects,
  acceptProject 
} = require("../controllers/projectController");

const { projectUpload } = require("../middlewares/multerMiddleware");

// Routes
router.post("/createProject", verifyToken, projectUpload, createProject);
router.get("/", getProjects);
router.get("/available", getAvailableProjects);
router.put("/accept/:projectId", verifyToken, acceptProject); 

module.exports = router;
