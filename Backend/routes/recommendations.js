const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const { recommendProjects } = require("../controllers/recommendationController");

router.get("/projects", verifyToken, recommendProjects);

module.exports = router;