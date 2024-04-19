"use client";
import React,{useState} from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Input } from '../ui/input'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
 
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
    <div className='space-y-4'>
      <Link href={"/listings/newListing"}><Button className="w-full text-[10px] md:text-sm lg:text-sm xl:text-sm">+ New Listing</Button></Link>
      <Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleSearch}
        className="w-full text-sm"
      />
      <h1 className='font-bold'>Listing Status</h1>
      <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Active</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Draft</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Expired</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-four" id="option-four" />
        <Label htmlFor="option-four">Sold Out</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-five" id="option-five" />
        <Label htmlFor="option-five">Inactive</Label>
      </div>
    </RadioGroup>
    </div>

    

</>  
  )
}

export default listingManager
