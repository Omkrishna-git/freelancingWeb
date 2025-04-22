import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const ProjectsAndPayments = () => {
  const [projects, setProjects] = useState([]);  // ✅ State for fetched projects
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [sortOption, setSortOption] = useState('az');
  const [visibleCount, setVisibleCount] = useState(5);

  // ✅ Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects'); // Backend URL
        const data = await response.json();
        setProjects(data); // Set fetched data
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  // ✅ Filter and sort projects
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

  return (
    <div className='p-6 bg-gray-100'>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
        <div className='relative mb-4 sm:mb-0'>
          <input
            type='text'
            placeholder='Search projects...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none'
          />
          <FaSearch className='absolute right-3 top-2 text-gray-500' />
        </div>

        <div className='flex gap-4'>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value=''>All Status</option>
            <option value='Ongoing'>Ongoing</option>
            <option value='Completed'>Completed</option>
            <option value='Disputed'>Disputed</option>
          </select>

          <select value={filterPayment} onChange={(e) => setFilterPayment(e.target.value)}>
            <option value=''>All Payment Modes</option>
            <option value='Direct'>Direct</option>
            <option value='Escrow'>Escrow</option>
          </select>
        </div>

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value='az'>Title (A-Z)</option>
          <option value='za'>Title (Z-A)</option>
        </select>
      </div>

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
            <tr key={project._id} className='hover:bg-gray-100'>
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

      <button onClick={() => setVisibleCount(visibleCount === 5 ? 10 : 5)}
        className='bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:from-green-500 hover:to-green-600 hover:scale-105 transition duration-300 ease-in-out mt-10'>
        {visibleCount === 5 ? 'Show More' : 'Show Less'}
      </button>
    </div>
  );
};

export default ProjectsAndPayments;
