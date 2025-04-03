const express = require("express");
const { registerFreelancer, loginFreelancer } = require("../controllers/FreelancerController");

const router = express.Router();

router.post("/register", registerFreelancer);
router.post("/login", loginFreelancer);

module.exports = router;
