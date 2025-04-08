const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "userModel" },
    userModel: { type: String, required: true, enum: ["Freelancer", "Company"] },
  },
  createdAt: { type: Date, default: Date.now },
  category: { type: String, required: true },
  status: { type: String, enum: ["published", "draft"], default: "draft" },
  tags: { type: [String], default: [] },
  content: { type: String, required: true },
  thumbnail: {
    data: Buffer,
    contentType: String,
  },
  attachedFiles: [
    {
      data: Buffer,
      contentType: String,
      fileName: String,
    },
  ],
});

module.exports = mongoose.model("Blog", blogSchema);