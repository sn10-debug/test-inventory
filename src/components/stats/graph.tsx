// components/Dashboard.js
'use client';
import { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = ({ data }:{data:any}) => {
  const [selectedGraph, setSelectedGraph] = useState('visits');

  const chartData: { [key: string]: any } = {
    visits: {
      labels: data.labels,
      datasets: [
        {
          label: 'Number of Visits',
          data: data.visits,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    },
    orders: {
      labels: data.labels,
      datasets: [
        {
          label: 'Number of Orders',
          data: data.orders,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: true,
        },
      ],
    },
    conversionRates: {
      labels: data.labels,
      datasets: [
        {
          label: 'Conversion Rate (%)',
          data: data.conversionRates,
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          fill: true,
        },
      ],
    },
    revenue: {
      labels: data.labels,
      datasets: [
        {
          label: 'Revenue ($)',
          data: data.revenue,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
        },
      ],
    },
  };

  const pieData = {
    labels: data.labels,
    datasets: [
      {
        label: selectedGraph,
        data: data[selectedGraph],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(199, 199, 199, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='space-y-4 p-4'>
      <div className="flex ">
        <select className="mb-4 cursor-pointer items-center rounded-md px-3 py-2 text-sm outline-none focus:bg-accent" onChange={(e) => setSelectedGraph(e.target.value)} value={selectedGraph}>
          <option value="visits">Site Visits</option>
          <option value="orders">Orders</option>
          <option value="conversionRates">Conversion Rate</option>
          <option value="revenue">Revenue</option>
        </select>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-center items-center">
        <div className='w-full '>
          <Line data={chartData[selectedGraph]} />
        </div>
        <div className=' h-3/4 w-2/4'>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
