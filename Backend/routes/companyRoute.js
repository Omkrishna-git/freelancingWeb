const express = require("express");
const { registerCompany, loginCompany, getCompanyById, updateCompanyProfile, uploadCompanyLogo, getAllCompanies, getAcceptedProjects, getCompanyProjects, getAllApplicantsForCompany, getOngoingProjects} = require("../controllers/companyController");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Company routes
router.post("/register", registerCompany);
router.post("/login", loginCompany);

// No need for :id, extract from JWT in controller
router.put("/update", verifyToken, updateCompanyProfile);
router.put("/upload/logo", verifyToken, upload.single("logo"), uploadCompanyLogo);
router.get("/getProjects", verifyToken, getCompanyProjects);
router.get("/all-applicants", verifyToken, getAllApplicantsForCompany);
router.get("/ongoing", verifyToken, getOngoingProjects);

router.get("/", getAllCompanies);
router.get("/profile", verifyToken, getCompanyById); // This may remain if you want public profile access




module.exports = router;
