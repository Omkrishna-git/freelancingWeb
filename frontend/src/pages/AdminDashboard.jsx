import React, { useState } from 'react';
import AdminHome from '../components/Admin-Home.jsx';
import ProjectsAndPayments from '../components/Project&Payment.jsx';
import AdminFreelancers from '../components/Admin-Freelancer.jsx';
import AdminCompanies from '../components/Admin-companies.jsx';
import { FaBars, FaHome, FaMoneyCheckAlt, FaUserTie, FaBuilding, FaChartBar } from 'react-icons/fa';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar */}
      <aside className={`bg-[#3e5349] text-white p-4 shadow-md flex flex-col items-start ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <button className='mb-6 text-white text-xl' onClick={toggleSidebar}>
          <FaBars />
        </button>
        
        {isSidebarOpen && (
          <h2 className='text-2xl font-bold mb-6'>Admin Dashboard</h2>
        )}

        <ul className='space-y-4 w-full'>
          <li>
            <a href='#admin-home' className='flex items-center gap-3 py-2 px-2 rounded hover:bg-green-700'>
              <FaHome />
              {isSidebarOpen && <span>Home</span>}
            </a>
          </li>
          <li>
            <a href='#projects-payments' className='flex items-center gap-3 py-2 px-2 rounded hover:bg-green-700'>
              <FaMoneyCheckAlt />
              {isSidebarOpen && <span>Projects & Payments</span>}
            </a>
          </li>
          <li>
            <a href='#freelancers' className='flex items-center gap-3 py-2 px-2 rounded hover:bg-green-700'>
              <FaUserTie />
              {isSidebarOpen && <span>Freelancers</span>}
            </a>
          </li>
          <li>
            <a href='#companies' className='flex items-center gap-3 py-2 px-2 rounded hover:bg-green-700'>
              <FaBuilding />
              {isSidebarOpen && <span>Companies</span>}
            </a>
          </li>
          <li>
            <a href='#disputes' className='flex items-center gap-3 py-2 px-2 rounded hover:bg-green-700'>
              <FaMoneyCheckAlt />
              {isSidebarOpen && <span>Dispute & Refunds</span>}
            </a>
          </li>
          <li>
            <a href='#reports' className='flex items-center gap-3 py-2 px-2 rounded hover:bg-green-700'>
              <FaChartBar />
              {isSidebarOpen && <span>Reports & Analytics</span>}
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-8 overflow-y-auto'>
        <section id='admin-home'>
          <AdminHome />
        </section>

        <section id='projects-payments' className='mt-8'>
          <h2 className='text-2xl font-bold mb-4'>Projects & Payments</h2>
          <ProjectsAndPayments />
        </section>

        <section id='freelancers' className='mt-8'>
          <h2 className='text-2xl font-bold '>Freelancers</h2>
          <AdminFreelancers />
        </section>

        <section id='companies' className='mt-8'>
          <h2 className='text-2xl font-bold '>Companies</h2>
          <AdminCompanies />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
