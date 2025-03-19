import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import DemoImage from '../assets/demo.png';

const companies = [
  {
    companyName: 'Google',
    category: 'Technology',
    services: ['Cloud Computing', 'AI Solutions', 'Cybersecurity'],
    contact: 'contact@google.com',
    img: DemoImage,
  },
  {
    companyName: 'Shopify',
    category: 'E-commerce',
    services: ['Web Development', 'Payment Solutions', 'Marketing'],
    contact: 'contact@shopify.com',
    img: DemoImage,
  },
  {
    companyName: 'ExxonMobil',
    category: 'Energy',
    services: ['Oil & Gas', 'Renewable Energy', 'Sustainability'],
    contact: 'contact@exxonmobil.com',
    img: DemoImage,
  },
  {
    companyName: 'Microsoft',
    category: 'Software',
    services: ['Cloud Computing', 'Productivity Software', 'AI'],
    contact: 'contact@microsoft.com',
    img: DemoImage,
  },
  {
    companyName: 'Tesla',
    category: 'Automotive',
    services: ['Electric Vehicles', 'Battery Storage', 'Autonomous Driving'],
    contact: 'contact@tesla.com',
    img: DemoImage,
  },
];

const AdminCompanies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortOption, setSortOption] = useState('az');
  const [visibleCount, setVisibleCount] = useState(4);

  const filteredCompanies = companies
    .filter((company) =>
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((company) => (filterCategory ? company.category === filterCategory : true))
    .sort((a, b) =>
      sortOption === 'az'
        ? a.companyName.localeCompare(b.companyName)
        : b.companyName.localeCompare(a.companyName)
    )
    .slice(0, visibleCount);

  const showMore = () => setVisibleCount((prev) => (prev >= 10 ? 4 : prev + 2));

  return (
    <div className='flex-1 p-6 bg-gray-100'>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
        <div className='relative mb-4 sm:mb-0'>
          <input
            type='text'
            placeholder='Search companies...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400'
          />
          <FaSearch className='absolute right-3 top-2 text-gray-500' />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          <option value=''>All Categories</option>
          <option value='Technology'>Technology</option>
          <option value='E-commerce'>E-commerce</option>
          <option value='Energy'>Energy</option>
          <option value='Software'>Software</option>
          <option value='Automotive'>Automotive</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          <option value='az'>Company Name (A-Z)</option>
          <option value='za'>Company Name (Z-A)</option>
        </select>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto max-h-96 px-4'>
        {filteredCompanies.map((company, index) => (
          <div key={index} className='bg-green-100 p-4 rounded-lg shadow-md text-center'>
            <img src={company.img} alt={company.companyName} className='w-24 h-24 rounded-full mx-auto' />
            <h3 className='mt-2 text-lg font-semibold'>{company.companyName}</h3>
            <p className='text-sm text-gray-600'>{company.category}</p>
            <div className='mt-2'>
              <h4 className='text-sm font-semibold text-gray-700'>Services</h4>
              <div className='flex flex-wrap justify-center gap-2 mt-1'>
                {company.services.map((service, idx) => (
                  <span key={idx} className='bg-gray-200 text-sm px-2 py-1 rounded-full'>
                    {service}
                  </span>
                ))}
              </div>
            </div>
            <div className='mt-2'>
              <h4 className='text-sm font-semibold text-gray-700'>Contact</h4>
              <p className='text-gray-900 font-semibold'>{company.contact}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={showMore} className='px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
        {visibleCount >= 10 ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

export default AdminCompanies;
