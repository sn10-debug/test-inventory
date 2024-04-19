import React from 'react'
import MarketingTabs from '@/components/marketingTabs/tabs';
import { Card } from '@/components/ui/card';
const page = () => {
  return (
    <Card>
      <h1 className="text-3xl font-bold p-4">Marketing</h1>
      <div className='p-4'>
      <MarketingTabs/>
      </div>
    </Card>
  )
}

export default page
