"use client";
import React,{useState} from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Input } from '../ui/input'
interface ListingManagerProps {
  listingData: any;
  onSearch: any;
}
const buttons=[{id:1, name:'Delete'},{id:2, name:'Deactivate'},{id:3, name:'Renew'}]
const listingManager = ({listingData, onSearch}: ListingManagerProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const filteredData = listingData.filter((item: any) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onSearch(filteredData);
  };
  return (
    <>
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
      


      <h1 className='font-bold'>Options</h1>
      <div className='flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row justify-between gap-4 '>
      {buttons.map((item)=>(
        <Button className=''><h1 className='text-xs md:text-sm lg:text-sm xl:text-sm'>{item.name}</h1></Button>
      ))}
      </div>
    </div>

    

</>  
  )
}

export default listingManager
