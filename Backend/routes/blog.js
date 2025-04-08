const express = require("express");
const { createBlog, getBlogById, getAllBlogs } = require("../controllers/blog");
const verifyToken = require("../middlewares/verifyToken");
const multer = require("multer");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

const blogUpload = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "attachedFile", maxCount: 5 },
]);

// Routes
router.post("/writeBlog", verifyToken, blogUpload, createBlog);
router.get("/:id", getBlogById);
router.get("/", getAllBlogs);

module.exports = router;