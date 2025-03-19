import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/card/Card';
import CardContent from '../components/ui/card/CardContent';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sampleChartData = [
  { month: 'Jan', payments: 5000 },
  { month: 'Feb', payments: 7000 },
  { month: 'Mar', payments: 6000 },
  { month: 'Apr', payments: 8000 },
  { month: 'May', payments: 9000 },
];

const AdminDashboard = () => {
  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar */}
      <aside className='w-64 bg-gray-800 text-white p-4 shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Admin Dashboard</h2>
        <ul className='space-y-4'>
          <li><Link to='/admin' className='block py-2 px-4 rounded hover:bg-green-700'>Home</Link></li>
          <li><Link to='/admin/projects' className='block py-2 px-4 rounded hover:bg-green-700'>Projects & Payments</Link></li>
          <li><Link to='/admin/freelancers' className='block py-2 px-4 rounded hover:bg-green-700'>Freelancers</Link></li>
          <li><Link to='/admin/companies' className='block py-2 px-4 rounded hover:bg-green-700'>Companies</Link></li>
          <li><Link to='/admin/disputes' className='block py-2 px-4 rounded hover:bg-green-700'>Dispute & Refunds</Link></li>
          <li><Link to='/admin/reports' className='block py-2 px-4 rounded hover:bg-green-700'>Reports & Analytics</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-8 overflow-y-auto'>
        <h1 className='text-3xl font-bold mb-6'>Welcome, Admin!</h1>
        <div className='grid grid-cols-3 gap-6 mb-8'>
          <Card>
            <CardContent>
              <h3 className='text-xl font-semibold mb-2'>Total Freelancers</h3>
              <p className='text-3xl font-bold'>320</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className='text-xl font-semibold mb-2'>Total Companies</h3>
              <p className='text-3xl font-bold'>150</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className='text-xl font-semibold mb-2'>Pending Payments</h3>
              <p className='text-3xl font-bold'>$25,000</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Analytics Chart */}
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-bold mb-4'>Monthly Payments Overview</h2>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={sampleChartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='payments' stroke='#82ca9d' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
