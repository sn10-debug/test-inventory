"use client";
import React,{useState} from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Input } from '../ui/input'
interface ListingManagerProps {
  listingData: any;
  onSearch: any;
}
const listingManager = ({listingData, onSearch}: ListingManagerProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const filteredData = listingData.filter((item: any) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(filteredData);
  };
  return (
    <div className='space-y-2'>
      <Link href={"/listings/newListing"}><Button className="w-full text-[10px] md:text-sm lg:text-sm xl:text-sm">+ New Listing</Button></Link>
<Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleSearch}
        className="w-full text-sm"
      />
    </div>
  
  )
}

export default listingManager
