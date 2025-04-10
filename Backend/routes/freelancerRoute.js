const express = require("express");
const { registerFreelancer, loginFreelancer , getFreelancer ,updateFreelancer } = require("../controllers/freelancerController");

const router = express.Router();

router.post("/register", registerFreelancer);
router.post("/login", loginFreelancer);

router.get("/:id", getFreelancer);

// Update profile by ID
router.put("/:id", updateFreelancer);

module.exports = router;
