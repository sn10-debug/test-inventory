// pages/index.js
import Dashboard from '@/components/stats/graph';
import DataTable from '@/components/stats/stats-table';
import { Card } from '@/components/ui/card';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  visits: [500, 1000, 750, 1250, 1500, 2000, 2500],
  orders: [50, 120, 90, 150, 180, 210, 300],
  conversionRates: [10, 12, 12, 12, 12, 10.5, 12],
  revenue: [500, 1200, 900, 1500, 1800, 2100, 3000],
};

const HomePage = () => (
  <Card className='space-y-4 p-6'>
    <h1 className='font-bold text-3xl'>Statistical Dashboard</h1>
    <Dashboard data={data} />
    <DataTable data={data} />
  </Card>
);

export default HomePage;
