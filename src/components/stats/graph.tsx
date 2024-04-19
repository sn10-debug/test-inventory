'use client';
import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js';

const LineChart = () => {
  const [data, setData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('visits');

  // Sample data (replace with your actual data fetching logic)
  const sampleData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Visits',
        data: [100, 120, 150, 180, 200],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Orders',
        data: [5, 8, 12, 15, 18],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Conversion Rate',
        data: [2.5, 3.33, 4, 4.76, 5],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
      },
      {
        label: 'Revenue',
        data: [1000, 1500, 2000, 2500, 3000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  useEffect(() => {
    const chartData = {
      labels: sampleData.labels,
      datasets: sampleData.datasets.filter(
        (dataset) => dataset.label === selectedMetric
      ),
    };
    setData(chartData);
  }, [selectedMetric]);

  const handleMetricChange = (event) => {
    setSelectedMetric(event.target.value);
  };

  const chartRef = React.createRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time Period',
            },
          },
          y: {
            title: {
              display: true,
              text: selectedMetric,
            },
          },
        },
      },
    });
  }, [data]);

  return (
    <div>
      <h2>Line Chart</h2>
      <select value={selectedMetric} onChange={handleMetricChange}>
        <option value="visits">Visits</option>
        <option value="orders">Orders</option>
        <option value="conversionRate">Conversion Rate</option>
        <option value="revenue">Revenue</option>
      </select>
      <canvas ref={chartRef} width={600} height={400} />
    </div>
  );
};

export default LineChart;
