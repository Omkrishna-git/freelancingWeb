const express = require("express");
const { registerCompany, loginCompany } = require("../controllers/companyController");
const router = express.Router();

router.post("/register", registerCompany);
router.post("/login", loginCompany);

module.exports = router;
