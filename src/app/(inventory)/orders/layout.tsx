import { Card } from '@/components/ui/card'
import React from 'react'

export default function layout(
    {children}: {children: React.ReactNode}
) {
  return (
    <Card>
    <h1 className="text-3xl font-bold p-4">Orders</h1>
    <div className='p-4'>
      {children}
    </div>
    </Card>
  )
}
