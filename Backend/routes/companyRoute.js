const express = require("express");
const { registerCompany, loginCompany, getCompanyById, updateCompanyProfile, uploadCompanyLogo } = require("../controllers/companyController");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", registerCompany);
router.post("/login", loginCompany);
router.get("/:id", getCompanyById);
router.put("/:id", updateCompanyProfile);
router.put("/upload/logo/:id", upload.single("logo"), uploadCompanyLogo);

module.exports = router;
