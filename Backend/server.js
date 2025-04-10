require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import routes
const companyRoutes = require("./routes/companyRoute");
const freelancerRoutes = require("./routes/freelancerRoute");
const projectRoutes = require("./routes/projectRoute");
const app = express();

// Middleware
app.use(express.json({ limit: "10mb" })); // Increase limit for large files
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],  // Allow requests from your frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies and authorization headers
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// API Routes
app.use("/api/companies", companyRoutes);
app.use("/api/freelancers", freelancerRoutes);
app.use("/api/blogs", require("./routes/blog"));
app.use('/uploads', express.static('uploads'));
app.use("/api/projects", projectRoutes);



// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Freelancing Website API!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
