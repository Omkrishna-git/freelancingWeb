import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import DemoImage2 from "../assets/demo.png";
import axios from "axios";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("az");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/blogs", {
          withCredentials: true,
        });
        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.error("❌ Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs
    .filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((blog) => (filterCategory ? blog.category === filterCategory : true))
    .sort((a, b) =>
      sortOption === "az" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );

  return (
    <div className="px-6 py-1 mb-10">
      <div className="relative text-center">
        <h1 className="text-3xl font-bold text-green-900 mt-5">BLOGS</h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Everything you need to know to grow your business...
        </p>
        {localStorage.getItem("userModel") && (
          <Link
            to="/write-blog"
            className="absolute top-0 right-1 text-gray p-3 rounded-full hover:bg-green-800 transition"
          >
            <FaPlus className="text-xl" />
          </Link>
        )}

      </div>

      {/* Search, Filter, Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>

        <div>
          <span className="text-md font-semibold mr-2 text-gray-700">Filter:</span>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            <option value="Graphics & design guides">Graphics & Design Guides</option>
            <option value="Video & animation guides">Video & Animation Guides</option>
            <option value="Digital marketing guides">Digital Marketing Guides</option>
          </select>
        </div>

        <div>
          <span className="text-md font-semibold mr-2 text-gray-700">Sort:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="az">Title (A-Z)</option>
            <option value="za">Title (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-3 gap-10 mt-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link key={blog._id} to={`/blog/${blog._id}`} className="bg-white">
              <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105">
                <img
                  src={`data:${blog.thumbnail?.contentType};base64,${btoa(
                    String.fromCharCode(...new Uint8Array(blog.thumbnail?.data?.data || []))
                  )}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <h2 className="mt-4 text-lg font-semibold text-gray-900">{blog.title}</h2>
                <p className="text-blue-600 text-sm font-semibold mt-2">{blog.category}</p>
                <p className="text-gray-600 text-sm mt-1">{blog.content?.slice(0, 80)}...</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src={DemoImage2} alt={blog.author} className="w-8 h-8 rounded-full" />
                    <span className="text-sm text-gray-700">
                      {blog.author}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-xl ${
                          i < Math.floor(blog.rating || 4) ? "text-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({blog.rating || 4.0})</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-3">No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
