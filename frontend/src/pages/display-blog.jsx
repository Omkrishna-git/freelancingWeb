import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [rating, setRating] = useState(0);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/blogs/${id}`);
        setBlog(res.data.blog || res.data); // fallback for both structures
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleRating = (rate) => setRating(rate);
  const toggleLike = () => {
    setLike(!like);
    if (dislike) setDislike(false);
  };
  const toggleDislike = () => {
    setDislike(!dislike);
    if (like) setLike(false);
  };

  const formatDate = (isoString) => new Date(isoString).toLocaleDateString();

  // Handle image conversion
  const getImageUrl = () => {
    if (
      blog?.thumbnail?.data &&
      blog?.thumbnail?.contentType
    ) {
      const base64String = btoa(
        new Uint8Array(blog.thumbnail.data.data).reduce(
          (acc, byte) => acc + String.fromCharCode(byte),
          ''
        )
      );
      return `data:${blog.thumbnail.contentType};base64,${base64String}`;
    } else if (typeof blog?.thumbnail === 'string') {
      return blog.thumbnail; // use as URL
    } else {
      return '/default-thumbnail.jpg'; // fallback image path
    }
  };

  if (loading) return <p className='text-center mt-10'>Loading blog...</p>;
  if (!blog) return <p className='text-center mt-10'>Blog not found.</p>;

  return (
    <div className='px-6 py-10'>
      <div className='max-w-8xl mx-auto bg-white p-6 rounded-lg shadow-md'>
        <Link to='/blog' className='text-blue-500 hover:underline'>← Back to Blogs</Link>

        {blog.thumbnail && (
          <img
            src={getImageUrl()}
            alt={blog.title}
            className='w-full max-h-96 object-cover rounded-md mt-4'
          />
        )}

        <h1 className='text-3xl font-bold mt-4'>{blog.title}</h1>

        <p className='text-gray-600 mt-2'>
          By <span className="font-medium">{blog.author}</span> ({blog.userModel}) | 
          {` ${blog.category} | ${formatDate(blog.createdAt)} `}
          <span className={`ml-2 text-sm px-2 py-1 rounded-full ${
            blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {blog.status}
          </span>
        </p>

        <div className='mt-4'>
          <p className='text-gray-800 leading-relaxed'>{blog.content}</p>
        </div>

        {/* Tags */}
        <div className='mt-4 flex flex-wrap gap-2'>
          {blog.tags && blog.tags.map((tag, index) => (
            <span
              key={index}
              className='bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full'
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Attached Files */}
        <div className='mt-6'>
          <h3 className='text-lg font-semibold'>Attached Files:</h3>
          <ul className='list-disc list-inside'>
            {blog.attachedFiles && blog.attachedFiles.map((file, index) => {
              if (file?.data && file?.contentType) {
                const base64String = btoa(
                  new Uint8Array(file.data.data).reduce(
                    (acc, byte) => acc + String.fromCharCode(byte),
                    ''
                  )
                );
                const fileUrl = `data:${file.contentType};base64,${base64String}`;
                return (
                  <li key={index}>
                    <a href={fileUrl} download={`file_${index}`} className='text-blue-600 underline'>
                      Download File {index + 1}
                    </a>
                  </li>
                );
              } else {
                return (
                  <li key={index} className='text-blue-600 underline'>
                    {typeof file === 'string' ? file : `File ${index + 1}`}
                  </li>
                );
              }
            })}
          </ul>
        </div>

        {/* Rating Section */}
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
  );
};

export default BlogDetailsPage;
