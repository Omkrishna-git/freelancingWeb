const express = require("express");
const router = express.Router();
const path = require("path");
const verifyToken = require("../middlewares/verifyToken");
const { createProject, getProjects } = require("../controllers/projectController");
const { projectUpload } = require("../middlewares/multerMiddleware");

router.post("/createProject",verifyToken, projectUpload, createProject);
router.get("/", getProjects);
module.exports = router;
