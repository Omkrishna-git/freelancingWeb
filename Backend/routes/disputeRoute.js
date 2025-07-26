const express = require("express");
const router = express.Router();
const disputeController = require("../controllers/disputeController");
const verifyToken = require("../middlewares/verifyToken");

// Freelancer/Company submits dispute
router.post("/submit", verifyToken, disputeController.submitDispute);

// Admin gets all disputes
router.get("/", verifyToken, disputeController.getAllDisputes);

// Admin resolves/rejects dispute
router.put("/:id", verifyToken, disputeController.updateDisputeStatus);

module.exports = router;