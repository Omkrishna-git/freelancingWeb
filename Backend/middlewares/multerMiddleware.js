// routes/blog.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const blogController = require("../controllers/blog");

// Multer setup
const storage = multer.memoryStorage(); // or configure disk storage
const upload = multer({
  storage: storage,
});

// Accept both files
const blogUpload = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "attachedFile", maxCount: 1 },
]);

// POST route with Multer
router.post("/", blogUpload, blogController.createBlog);

module.exports = router;
