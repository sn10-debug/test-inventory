import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const listingManager = () => {
  return (
    <div>
      <Link href={"/listings/newListing"}><Button className=""><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-full h-full">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
New Listing</Button></Link>
    </div>
  )
}

export default listingManager
