// pages/dashboard.js
'use client';
import { useState } from 'react';
import data from '@/data/dashboard.json'; // Adjust the path as necessary
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('past7Days');
  
  const statsOverview = data.statsOverview[timePeriod as keyof typeof data.statsOverview];
  const openOrders = data.openOrders[timePeriod as keyof typeof data.statsOverview];
  const listings = data.listings[timePeriod as keyof typeof data.statsOverview];

  return (
    <Card className="p-4">
      <CardTitle className="text-3xl py-6">Dashboard</CardTitle>

      <div className="max-w-7xl mx-auto space-y-4">
        {/* Dropdown for Time Period Selection */}
        <div className="flex ">
          <label htmlFor="timePeriod" className="block text-lg font-medium text-gray-700">Select Time Period:</label>
          <select
            id="timePeriod"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="s block  pl-3 pr-10  text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="past7Days">Past 7 Days</option>
            <option value="past1Month">Past 1 Month</option>
            <option value="past3Months">Past 3 Months</option>
            <option value="past1Year">Past 1 Year</option>
          </select>
        </div>

        {/* Stats Overview */}
        <Card className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Stats overview for</h2>
          <div className="grid grid-cols-4 gap-6">
            {statsOverview.map((stat, index: number) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
                <p className={stat.changeType === 'down' ? 'text-red-500' : 'text-green-500'}>
                  {stat.changeType === 'down' ? '▼' : '▲'} {stat.change}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Open Orders */}
        <Card className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-bold mb-4">Your open orders</h2>
            <a href="/orders/admin" className="text-blue-500">All orders &rarr;</a>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-lg">Ship within a week</p>
              <p className="text-2xl font-bold">{openOrders.shipWithinWeek} orders</p>
            </div>
          </div>
        </Card>

        {/* Listings */}
        <Card className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-bold mb-4">Listings</h2>
            <a href="/listings" className="text-blue-500">View all listings &rarr;</a>
          </div>
          <div className="space-y-4">
            {listings.map((listing:any, index: number) => (
              <div key={index} className="flex justify-between">
                <p className="text-lg">{listing.label}</p>
                <p className="text-2xl font-bold">{listing.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Card>
  );
}
