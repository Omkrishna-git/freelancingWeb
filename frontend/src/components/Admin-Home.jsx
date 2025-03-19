import React from 'react';
import Card from '../components/ui/card/Card';
import CardContent from '../components/ui/card/CardContent';
import ProjectsAndPayments from '../components/Project&Payment.jsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const sampleChartData = [
  { month: 'Jan', payments: 5000 },
  { month: 'Feb', payments: 7000 },
  { month: 'Mar', payments: 6000 },
  { month: 'Apr', payments: 8000 },
  { month: 'May', payments: 9000 },
];

const AdminHome = () => {
  return (
    <main className='flex-1 p-8 overflow-y-auto'>
      <section id='home'>
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
      </section>

      <section id='projects-payments' className='mt-8'>
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
      </section>
    </main>
  );
};

export default AdminHome;
