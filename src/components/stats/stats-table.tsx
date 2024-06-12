'use client';
import React, { useState } from 'react';

const DataTable = ({ data }:{data:any}) => {
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleMonthChange = (event:any) => {
    setSelectedMonth(event.target.value);
    setCurrentPage(1); // Reset page number when changing month
  };

  const dummyData: { [key: string]: { name: string; views: number; cart: number; orders: number; revenue: number; }[] } = {
    January: [
      { name: 'Product 1', views: 1000, cart: 100, orders: 50, revenue: 5000 },
      { name: 'Product 2', views: 2000, cart: 200, orders: 80, revenue: 8000 },
      { name: 'Product 3', views: 1500, cart: 150, orders: 60, revenue: 6000 },
      { name: 'Product 4', views: 2500, cart: 250, orders: 120, revenue: 12000 },
      { name: 'Product 5', views: 1800, cart: 180, orders: 90, revenue: 9000 },
      { name: 'Product 6', views: 2200, cart: 220, orders: 100, revenue: 11000 },
      { name: 'Product 7', views: 1700, cart: 170, orders: 80, revenue: 8500 },
      { name: 'Product 8', views: 2300, cart: 230, orders: 110, revenue: 11500 },
      { name: 'Product 9', views: 1900, cart: 190, orders: 95, revenue: 9500 },
      { name: 'Product 10', views: 2100, cart: 210, orders: 105, revenue: 10500 },
    ],
    February: [
      { name: 'Product 1', views: 1200, cart: 120, orders: 60, revenue: 6000 },
      { name: 'Product 2', views: 2200, cart: 220, orders: 90, revenue: 9000 },
      { name: 'Product 3', views: 1700, cart: 170, orders: 70, revenue: 7000 },
      { name: 'Product 4', views: 2700, cart: 270, orders: 130, revenue: 13000 },
      { name: 'Product 5', views: 2000, cart: 200, orders: 100, revenue: 10000 },
      { name: 'Product 6', views: 2200, cart: 220, orders: 100, revenue: 11000 },
      { name: 'Product 7', views: 1700, cart: 170, orders: 80, revenue: 8500 },
      { name: 'Product 8', views: 2300, cart: 230, orders: 110, revenue: 11500 },
      { name: 'Product 9', views: 1900, cart: 190, orders: 95, revenue: 9500 },
      { name: 'Product 10', views: 2100, cart: 210, orders: 105, revenue: 10500 },
    ],
    March: [
      { name: 'Product 1', views: 1100, cart: 110, orders: 55, revenue: 5500 },
      { name: 'Product 2', views: 2100, cart: 210, orders: 85, revenue: 8500 },
      { name: 'Product 3', views: 1600, cart: 160, orders: 65, revenue: 6500 },
      { name: 'Product 4', views: 2600, cart: 260, orders: 125, revenue: 12500 },
      { name: 'Product 5', views: 1900, cart: 190, orders: 95, revenue: 9500 },
      { name: 'Product 6', views: 2100, cart: 210, orders: 95, revenue: 10500 },
      { name: 'Product 7', views: 1600, cart: 160, orders: 75, revenue: 8000 },
      { name: 'Product 8', views: 2200, cart: 220, orders: 115, revenue: 11000 },
      { name: 'Product 9', views: 1800, cart: 180, orders: 90, revenue: 9000 },
      { name: 'Product 10', views: 2000, cart: 200, orders: 100, revenue: 10000 },
    ],
    April: [
      { name: 'Product 1', views: 1300, cart: 130, orders: 65, revenue: 6500 },
      { name: 'Product 2', views: 2300, cart: 230, orders: 95, revenue: 9500 },
      { name: 'Product 3', views: 1800, cart: 180, orders: 75, revenue: 7500 },
      { name: 'Product 4', views: 2800, cart: 280, orders: 135, revenue: 13500 },
      { name: 'Product 5', views: 2100, cart: 210, orders: 105, revenue: 10500 },
      { name: 'Product 6', views: 2300, cart: 230, orders: 105, revenue: 11500 },
      { name: 'Product 7', views: 1800, cart: 180, orders: 85, revenue: 8500 },
      { name: 'Product 8', views: 2400, cart: 240, orders: 120, revenue: 12000 },
      { name: 'Product 9', views: 2000, cart: 200, orders: 100, revenue: 10000 },
      { name: 'Product 10', views: 2200, cart: 220, orders: 110, revenue: 11000 },
    ],
    May: [
      { name: 'Product 1', views: 1400, cart: 140, orders: 70, revenue: 7000 },
      { name: 'Product 2', views: 2400, cart: 240, orders: 100, revenue: 10000 },
      { name: 'Product 3', views: 1900, cart: 190, orders: 80, revenue: 8000 },
      { name: 'Product 4', views: 2900, cart: 290, orders: 140, revenue: 14000 },
      { name: 'Product 5', views: 2200, cart: 220, orders: 110, revenue: 11000 },
      { name: 'Product 6', views: 2400, cart: 240, orders: 110, revenue: 12000 },
      { name: 'Product 7', views: 1900, cart: 190, orders: 90, revenue: 9000 },
      { name: 'Product 8', views: 2500, cart: 250, orders: 125, revenue: 12500 },
      { name: 'Product 9', views: 2100, cart: 210, orders: 105, revenue: 10500 },
      { name: 'Product 10', views: 2300, cart: 230, orders: 115, revenue: 11500 },
    ],
    June: [
      { name: 'Product 1', views: 1500, cart: 150, orders: 75, revenue: 7500 },
      { name: 'Product 2', views: 2500, cart: 250, orders: 110, revenue: 11000 },
      { name: 'Product 3', views: 2000, cart: 200, orders: 90, revenue: 9000 },
      { name: 'Product 4', views: 3000, cart: 300, orders: 150, revenue: 15000 },
      { name: 'Product 5', views: 2300, cart: 230, orders: 120, revenue: 12000 },
      { name: 'Product 6', views: 2500, cart: 250, orders: 120, revenue: 13000 },
      { name: 'Product 7', views: 2000, cart: 200, orders: 100, revenue: 10000 },
      { name: 'Product 8', views: 2600, cart: 260, orders: 130, revenue: 13000 },
      { name: 'Product 9', views: 2200, cart: 220, orders: 110, revenue: 11000 },
      { name: 'Product 10', views: 2400, cart: 240, orders: 120, revenue: 12000 },
    ],
    July: [
      { name: 'Product 1', views: 1600, cart: 160, orders: 80, revenue: 8000 },
      { name: 'Product 2', views: 2600, cart: 260, orders: 120, revenue: 12000 },
      { name: 'Product 3', views: 2100, cart: 210, orders: 100, revenue: 10000 },
      { name: 'Product 4', views: 3100, cart: 310, orders: 160, revenue: 16000 },
      { name: 'Product 5', views: 2400, cart: 240, orders: 130, revenue: 13000 },
      { name: 'Product 6', views: 2600, cart: 260, orders: 130, revenue: 14000 },
      { name: 'Product 7', views: 2100, cart: 210, orders: 110, revenue: 11000 },
      { name: 'Product 8', views: 2700, cart: 270, orders: 140, revenue: 14000 },
      { name: 'Product 9', views: 2300, cart: 230, orders: 120, revenue: 12000 },
      { name: 'Product 10', views: 2500, cart: 250, orders: 130, revenue: 13000 },
    ],
  };

  const monthIndex = data.labels.indexOf(selectedMonth);
  const totalItems = dummyData[selectedMonth].length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyData[selectedMonth].slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="space-y-4 p-4">
        
        <select id="month-select" className='mb-4 cursor-pointer items-center rounded-md px-3 py-2 text-sm outline-none focus:bg-accent' value={selectedMonth} onChange={handleMonthChange}>
          {data.labels.map((label:any) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Views</th>
            <th className="px-4 py-2">Cart</th>
            <th className="px-4 py-2">Orders</th>
            <th className="px-4 py-2">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.views}</td>
              <td className="border px-4 py-2">{item.cart}</td>
              <td className="border px-4 py-2">{item.orders}</td>
              <td className="border px-4 py-2">{item.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <ul className="flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className="mr-2">
              <button
                className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataTable;