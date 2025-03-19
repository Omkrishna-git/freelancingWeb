import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlus } from 'react-icons/fa';

const projects = [
  { id: 1, projectName: 'Web App Dev', companyName: 'ABC Corp', freelancer: 'John Doe', budget: 500, status: 'Ongoing', paymentMode: 'Escrow' },
  { id: 2, projectName: 'Mobile App Design', companyName: 'XYZ Ltd', freelancer: 'Jane Smith', budget: 2000, status: 'Completed', paymentMode: 'Direct' },
  { id: 3, projectName: 'SEO Optimization', companyName: 'Tech Solutions', freelancer: 'Mike Johnson', budget: 750, status: 'Ongoing', paymentMode: 'Escrow' },
  { id: 4, projectName: 'Graphic Design', companyName: 'Creative Studio', freelancer: 'Anna Brown', budget: 300, status: 'Completed', paymentMode: 'Direct' },
  { id: 5, projectName: 'E-commerce Platform', companyName: 'Shopify Inc.', freelancer: 'David Clark', budget: 1500, status: 'Ongoing', paymentMode: 'Escrow' },
  { id: 6, projectName: 'Content Writing', companyName: 'WriteItRight', freelancer: 'Emily Davis', budget: 250, status: 'Completed', paymentMode: 'Direct' },
  { id: 7, projectName: 'Data Analysis', companyName: 'DataWiz', freelancer: 'Michael Lee', budget: 1200, status: 'Ongoing', paymentMode: 'Escrow' },
  { id: 8, projectName: 'Video Editing', companyName: 'VidWorks', freelancer: 'Sarah King', budget: 800, status: 'Completed', paymentMode: 'Direct' },
  { id: 9, projectName: 'Cybersecurity Audit', companyName: 'SecureNet', freelancer: 'Chris Martin', budget: 2000, status: 'Ongoing', paymentMode: 'Escrow' },
  { id: 10, projectName: 'AI Model Development', companyName: 'AI Innovators', freelancer: 'Sophia Turner', budget: 3000, status: 'Ongoing', paymentMode: 'Escrow' }
];
const ProjectsAndPayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [sortOption, setSortOption] = useState('az');

  const filteredProjects = projects
    .filter((project) =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((project) => (filterStatus ? project.status === filterStatus : true))
    .filter((project) => (filterPayment ? project.paymentMode === filterPayment : true))
    .sort((a, b) =>
      sortOption === 'az'
        ? a.projectName.localeCompare(b.projectName)
        : b.projectName.localeCompare(a.projectName)
    );

    const [visibleCount, setVisibleCount] = useState(5);

    const showMore = () => setVisibleCount((prev) => (prev >= 10 ? 5 : 10));
  

  return (
    <div className='flex-1 p-6 bg-gray-100'>
    
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
        <div className='relative mb-4 sm:mb-0'>
          <input
            type='text'
            placeholder='Search projects...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400'
          />
          <FaSearch className='absolute right-3 top-2 text-gray-500' />
        </div>

        <div className='flex gap-4'>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          >
            <option value=''>All Status</option>
            <option value='Ongoing'>Ongoing</option>
            <option value='Completed'>Completed</option>
            <option value='Disputed'>Disputed</option>
          </select>

          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          >
            <option value=''>All Payment Modes</option>
            <option value='Direct'>Direct</option>
            <option value='Escrow'>Escrow</option>
          </select>
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className='px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          <option value='az'>Title (A-Z)</option>
          <option value='za'>Title (Z-A)</option>
        </select>
      </div>

      <div className='overflow-y-auto max-h-64 mb-4'>
        <table className='w-full border text-center bg-white shadow-lg'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='py-2 px-4'>Project Name</th>
              <th className='py-2 px-4'>Company Name</th>
              <th className='py-2 px-4'>Freelancer</th>
              <th className='py-2 px-4'>Budget ($)</th>
              <th className='py-2 px-4'>Status</th>
              <th className='py-2 px-4'>Payment Mode</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.slice(0, visibleCount).map((project) => (
              <tr key={project.id} className='hover:bg-gray-100'>
                <td className='py-2 px-4'>{project.projectName}</td>
                <td className='py-2 px-4'>{project.companyName}</td>
                <td className='py-2 px-4'>{project.freelancer}</td>
                <td className='py-2 px-4'>${project.budget}</td>
                <td className='py-2 px-4'>{project.status}</td>
                <td className='py-2 px-4'>{project.paymentMode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={showMore} className='px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
        {visibleCount >= 10 ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

export default ProjectsAndPayments;
