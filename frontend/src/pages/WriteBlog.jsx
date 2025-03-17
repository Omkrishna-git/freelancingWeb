import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";

const defaultThumbnail = "https://via.placeholder.com/150";

const WriteBlogPage = () => {
  const [thumbnail, setThumbnail] = useState(defaultThumbnail);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    setAttachedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, author, date, category, content, attachedFile });
    alert("Blog submitted successfully!");
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
            src={thumbnail}
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
          onChange={(e) => setTitle(e.target.value)}
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
          <option value="Graphics & Design">Graphics & Design</option>
          <option value="Video & Animation">Video & Animation</option>
          <option value="Digital Marketing">Digital Marketing</option>
        </select>

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
            <FaUpload /> Attach File
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          {attachedFile && <span className="text-gray-700">{attachedFile.name}</span>}
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex justify-between">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Submit Blog
          </button>
          <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteBlogPage;
