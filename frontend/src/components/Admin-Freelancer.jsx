import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import DemoImage from '../assets/demo.png';



const AdminFreelancers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOption, setSortOption] = useState('az');
  const [visibleCount, setVisibleCount] = useState(4);
  const [freelancers, setFreelancers] = useState([]);

    useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/freelancers/getFreelancers`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setFreelancers(data);
          else setFreelancers([]);
        })
        .catch(() => setFreelancers([]));
    }, []);

  const filteredFreelancer = freelancers
    .filter((freelancer) =>
      freelancer.fullName
        ? freelancer.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
    .filter((freelancer) => (filterStatus ? freelancer.company === filterStatus : true))
    .sort((a, b) =>
      sortOption === 'az'
        ? (a.fullName || '').localeCompare(b.fullName || '')
        : (b.fullName || '').localeCompare(a.fullName || '')
    )
    .slice(0, visibleCount);

  const showMore = () => setVisibleCount((prev) => (prev >= 10 ? 4 : prev + 2));

  return (
    <div className='flex-1 p-6 bg-gray-100'>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
        <div className='relative mb-4 sm:mb-0'>
          <input
            type='text'
            placeholder='Search freelancers...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400'
          />
          <FaSearch className='absolute right-3 top-2 text-gray-500' />
        </div>
             {/* Filter Dropdown */}
        <div className="relative">
          <span className="text-md font-semibold mr-2 text-gray-700">Filter:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All Categories</option>
            <option value="Graphics & design guides">Graphics & Design Guides</option>
            <option value="Video & animation guides">Video & Animation Guides</option>
            <option value="Digital marketing guides">Digital Marketing Guides</option>
          </select>
        </div>


        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400'
        >
          <option value='az'>Name (A-Z)</option>
          <option value='za'>Name (Z-A)</option>
        </select>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto max-h-96 px-4'>
        {filteredFreelancer.map((freelancer, index) => (
          <div key={index} className='bg-green-100 p-4 rounded-lg shadow-md text-center'>
            <img src={freelancer.profileImage || DemoImage} alt={freelancer.fullName} className='w-24 h-24 rounded-full mx-auto' />
            <h3 className='mt-2 text-lg font-semibold'>{freelancer.fullName}</h3>
            <p className='text-sm text-gray-600'>{freelancer.title}</p>
            <div className='mt-2'>
              <h4 className='text-sm font-semibold text-gray-700'>Expertise</h4>
              <div className='flex flex-wrap justify-center gap-2 mt-1'>
                {(freelancer.skills || []).map((skill, idx) => (
                  <span key={idx} className='bg-gray-200 text-sm px-2 py-1 rounded-full'>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className='mt-2'>
              <h4 className='text-sm font-semibold text-gray-700'>Languages</h4>
              <p className='text-gray-900 font-semibold'>{(freelancer.languages || []).join(", ")}</p>
            </div>
            <div className='mt-2'>
              <h4 className='text-sm font-semibold text-gray-700'>Categories</h4>
              <p className='text-gray-900 font-semibold'>{(freelancer.projectCategories || []).join(", ")}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={showMore}
        className='mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400'
      >
        {visibleCount >= 10 ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

export default AdminFreelancers;
