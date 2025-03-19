import React, { useState } from 'react';

import { useParams, Link } from 'react-router-dom';
import image1 from "../assets/image 28.png";
import image2 from "../assets/image 29.png";
import image3 from "../assets/image 32.png";

const blogData = [
  {
    id: 1,
    title: 'The Ultimate Guide to Logo Redesign',
    author: 'John Doe',
    category: 'Graphics & design guides',
    date: 'March 16, 2025',
    thumbnail: image1,
    content:
      'Learn about when you should consider a logo redesign. The importance of branding, visual identity, and market perception are discussed in this comprehensive guide.',
    attachedFiles: ['sample-file.pdf', 'design-template.zip'],
  },
  {
    id: 2,
    title: 'How to Build a Social Media Video Marketing Strategy',
    author: 'Jane Smith',
    category: 'Video & animation guides',
    date: 'February 12, 2025',
    thumbnail: image2,
    content:
      'You need scriptwriters, video editors, and quality equipment to create engaging video content. Learn the strategies that can help boost your video marketing.',
    attachedFiles: ['marketing-guide.pdf'],
  },
  {
    id: 3,
    title: '10 Ways to Make Money on Snapchat',
    author: 'Jane Doe',
    category: 'Digital marketing guides',
    date: 'March 10, 2025',
    thumbnail: image3,
    content:
      'Learn proven methods for monetizing your Snapchat presence and maximizing engagement.',
    attachedFiles: ['snapchat-strategy.pdf'],
  },
];

const BlogDetailsPage = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <p className='text-center mt-10'>Blog not found.</p>;
  }

  const [rating, setRating] = useState(0);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  

  const handleRating = (rate) => setRating(rate);

  const toggleLike = () => {
    setLike(!like);
    if (dislike) setDislike(false);
  };

  const toggleDislike = () => {
    setDislike(!dislike);
    if (like) setLike(false);
  };

  return (
    <div className='px-6 py-10'>
      <div className='max-w-8xl mx-auto bg-white p-6 rounded-lg shadow-md r'>
        <Link to='/blog' className='text-blue-500 hover:underline'>Back to Blogs</Link>
        {/* <img
          src={blog.thumbnail}
          alt={blog.title}
          className='w-1/2 h-1/4 object-cover rounded-md mt-4  mx-auto'
        /> */}
        <h1 className='text-3xl font-bold mt-4'>{blog.title}</h1>
        <p className='text-gray-600 mt-2'>
          By {blog.author} | {blog.category} | {blog.date}
        </p>
        <p className='mt-4'>{blog.content}</p>

        {/* Attached Files */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold'>Attached Files:</h3>
          <ul className='list-disc list-inside'>
            {blog.attachedFiles.map((file, index) => (
              <li key={index} className='text-blue-600 underline cursor-pointer'>
                {file}
              </li>
            ))}
          </ul>
        <div className='mt-6'>
          <h3 className='text-lg font-semibold'>Rate this Blog:</h3>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              ★
            </span>
          ))}
          <p className='mt-2'>Your Rating: {rating} / 5</p>
        </div>

        {/* Like & Dislike */}
        <div className='mt-4 flex space-x-4'>
          <button
            onClick={toggleLike}
            className={`px-4 py-2 rounded ${like ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            👍 Like
          </button>
          <button
            onClick={toggleDislike}
            className={`px-4 py-2 rounded ${dislike ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            👎 Dislike
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default BlogDetailsPage;
