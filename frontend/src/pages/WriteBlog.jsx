import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import defaultThumbnailImg from "../assets/BBC.png";

const WriteBlogPage = () => {
  const token = localStorage.getItem("token");
  const userModel = localStorage.getItem("userModel");
  const userId = localStorage.getItem("userId");

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(defaultThumbnailImg);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("published");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    setAttachedFiles([...e.target.files]);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(
      newTitle
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("userModel", userModel);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("tags", JSON.stringify(tags.split(",").map((tag) => tag.trim())));
    formData.append("content", content);

    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    attachedFiles.forEach((file) => {
      formData.append("attachedFile", file);
    });

    try {
      const response = await fetch("http://localhost:8000/api/blogs/writeBlog", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Blog submission failed:", errorData);
        alert("Failed to submit blog. " + (errorData.message || "Check console for details."));
        return;
      }

      const data = await response.json();
      console.log("✅ Blog submitted:", data);
      alert("Blog submitted successfully!");
    } catch (err) {
      console.error("❌ Blog submission error:", err);
      alert("Something went wrong while submitting the blog.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-green-800 mb-4">
        Write a New Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Thumbnail Upload */}
        <div className="flex flex-col items-center">
          <img
            src={thumbnailPreview}
            alt="Thumbnail Preview"
            className="w-32 h-32 object-cover rounded-lg shadow-md"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="mt-2 text-sm"
          />
        </div>

        {/* Blog Details */}
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={handleTitleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          required
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          required
        >
          <option value="">Select Category</option>
          <option value="Graphics & design guides">Graphics & design guides</option>
          <option value="Video & animation guides">Video & animation guides</option>
          <option value="Digital marketing guides">Digital marketing guides</option>
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          required
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {/* Tags */}
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
        />

        {/* Blog Content */}
        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          required
        ></textarea>

        {/* File Upload */}
        <div className="flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            <FaUpload /> Attach Files
            <input type="file" multiple className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Submit Blog
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteBlogPage;
