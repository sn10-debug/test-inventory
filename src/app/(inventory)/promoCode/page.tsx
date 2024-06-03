import React from 'react'
import MarketingTabs from '@/components/promocodeTabs/tabs';
import { Card } from '@/components/ui/card';
const page = () => {
  return (
    <Card>
      <h1 className="text-3xl font-bold p-4">PromoCode</h1>
      <div className='p-4'>
      <MarketingTabs/>
      </div>
    </Card>
  )
}

export default page
