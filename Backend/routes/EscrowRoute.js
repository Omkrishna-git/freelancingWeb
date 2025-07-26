const express = require("express");
const router = express.Router();
const path = require("path");

const { initiateEscrowPayment, markProjectAsInProgress } = require("../controllers/EscrowController");
const verifyToken = require("../middlewares/verifyToken");


router.post("/initiate", verifyToken, initiateEscrowPayment);
router.post("/success", verifyToken, markProjectAsInProgress);
router.post("/verify", verifyRazorpayPayment);

module.exports = router;

