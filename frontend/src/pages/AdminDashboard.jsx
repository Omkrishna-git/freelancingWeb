import React, { useState } from 'react';
import AdminHome from '../components/Admin-Home.jsx';
import ProjectsAndPayments from '../components/Project&Payment.jsx';
import AdminFreelancers from '../components/Admin-Freelancer.jsx';
import AdminCompanies from '../components/Admin-companies.jsx';
import { FaBars } from 'react-icons/fa';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white p-4 shadow-md ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <button className='mb-6 text-white' onClick={toggleSidebar}>
          <FaBars />
        </button>
        <h2 className='text-2xl font-bold mb-6'>Admin Dashboard</h2>
        <ul className='space-y-4'>
          <li><a href='#admin-home' className='block py-2 px-4 rounded hover:bg-green-700'>Home</a></li>
          <li><a href='#projects-payments' className='block py-2 px-4 rounded hover:bg-green-700'>Projects & Payments</a></li>
          <li><a href='#freelancers' className='block py-2 px-4 rounded hover:bg-green-700'>Freelancers</a></li>
          <li><a href='#companies' className='block py-2 px-4 rounded hover:bg-green-700'>Companies</a></li>
          <li><a href='#disputes' className='block py-2 px-4 rounded hover:bg-green-700'>Dispute & Refunds</a></li>
          <li><a href='#reports' className='block py-2 px-4 rounded hover:bg-green-700'>Reports & Analytics</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-8 overflow-y-auto gap-5'>
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

        <section id='freelancers' className='mt-8'>
          <h2 className='text-2xl font-bold '>Comapanies</h2>
          <AdminCompanies/>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
