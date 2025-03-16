import React from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    category: "Graphics & design guides",
    title: "The Ultimate Guide to Logo Redesign",
    description: "Learn about when you should consider a logo redesign.",
    image:"../assets/image 28.png"
  },
  {
    id: 2,
    category: "Video & animation guides",
    title: "How to build a social media video marketing",
    description: "You need scriptwriters, video editors, and quality equipment.",
    image:"../assets/image 28.png"
  },
  {
    id: 3,
    category: "Digital marketing guides",
    title: "10 Ways to Make Money on Snapchat",
    description: "Learn proven methods for monetizing your Snapchat presence.",
    image:"../assets/image 28.png"
  },
  {
    id: 4,
    category: "Graphics & design guides",
    title: "The Ultimate Guide to Logo Redesign",
    description: "Learn about when you should consider a logo redesign.",
    image:"../assets/image 32.png"
  },
  {
    id: 5,
    category: "Video & animation guides",
    title: "How to build a social media video marketing",
    description: "You need scriptwriters, video editors, and quality equipment.",
    image:"../assets/image 29.png"
  },
  {
    id: 6,
    category: "Digital marketing guides",
    title: "10 Ways to Make Money on Snapchat",
    description: "Learn proven methods for monetizing your Snapchat presence.",
    image:"../assets/image 32.png"
  },
];

const BlogsPage = () => {
  return (
    <div className="px-6 py-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-900">BLOGS</h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Everything you need to know to grow your business. Practical online
          resources covering digital marketing, video animation, writing,
          copywriting, programming, and design!
        </p>
      </div>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center mt-6">
        <FaSearch className="text-xl text-gray-700 cursor-pointer" />
        <FaPlus className="text-xl text-gray-700 cursor-pointer" />
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <p className="text-blue-600 mt-2 text-sm font-semibold">
              {blog.category}
            </p>
            <h3 className="text-lg font-bold mt-1">{blog.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
