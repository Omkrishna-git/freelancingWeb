const Blog = require("../models/Blog");

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, slug, author, category, status, tags, content, userId, userModel } = req.body;

    // Validate required fields
    if (!title || !slug || !author || !category || !content || !userId || !userModel) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Check if slug is unique
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ message: "Slug must be unique" });
    }

    // Prepare blog data
    const blogData = {
      title,
      slug,
      author,
      category,
      status,
      tags: tags ? JSON.parse(tags) : [],
      content,
      user: { id: userId, userModel },
    };

    // Handle thumbnail upload
    if (req.files && req.files.thumbnail) {
      blogData.thumbnail = {
        data: req.files.thumbnail[0].buffer,
        contentType: req.files.thumbnail[0].mimetype,
      };
    }

    // Handle attached files
    if (req.files && req.files.attachedFile) {
      blogData.attachedFiles = req.files.attachedFile.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype,
        fileName: file.originalname,
      }));
    }

    // Save blog to database
    const newBlog = new Blog(blogData);
    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};