'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Spinner from '@/components/ui/spinner'; // Import the spinner component
function extractFileId(webViewLink:string) {
  const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
  const match = webViewLink.match(regex);
  return match ? match[1] : null;
}
const CardComponent = ({ title, content, id, image, sku, price, priceIndia, status, variants, draft }: { title: string, content: string, id: string, image: string, sku: string, price: number, priceIndia: number, status: string, variants: { SKU: string }[], draft?: boolean }) => {
  

const webViewLink = image;
const fileId = extractFileId(webViewLink);
  return (
  
    <Card className='flex flex-col justify-between'>
      <div>
      <Image 
        src={`https://drive.google.com/uc?export=view&id=${"1EaAjp5GU792n916TSKyqVSrIZsV0GimA"}`}
        width={500} 
        height={500}
        alt="product image"
        className='w-full h-80 rounded hover:scale-105 md:object-contain md:object-contain xl:object-fill lg:object-contain'
      />
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      </div>
      <CardContent className='space-y-2'>
        <div className='text-gray-500 text-sm'>SKU : {sku}</div>
        <div className='text-gray-500 text-sm'>Price(Indian) : {price} </div>
        <div className='text-gray-500 text-sm'>Price(Everywhere) : {priceIndia}</div>
        <div className='flex flex-row items-center justify-between'>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <Link href={`/listings/${id}`} key={id}>
                  <DropdownMenuItem>
                    Edit
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  Delete
                </DropdownMenuItem>
                {status.toLowerCase() === 'draft' && (
                  <DropdownMenuItem>
                    Activate
                  </DropdownMenuItem>
                )}
                {status.toLowerCase() === 'active' && (
                  <DropdownMenuItem>
                    Deactivate
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const App = () => {
  const [cards, setCards] = useState<{
    draft: any; _id: string, name: string, description: string, images: any, priceIndia: number, SKU: string
  }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchResults, setSearchResults] = useState(cards);
  const [loading, setLoading] = useState(false); // State for loading
  let domain='http://bohotree.vercel.app'
  domain=''

  const fetchAllData = async () => {
    setLoading(true); // Show spinner
    try {
      const response = await axios.get(`${domain}/api/v1/listing`);
      setCards(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching all data:', error);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  const fetchActiveData = async () => {
    setLoading(true); // Show spinner
    try {
      const response = await axios.get(`${domain}/api/v1/listing/active`);
      setCards(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching active data:', error);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  const fetchDraftData = async () => {
    setLoading(true); // Show spinner
    try {
      const response = await axios.get(`${domain}/api/v1/listing/draft`);
      setCards(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching draft data:', error);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  useEffect(() => {
    const filteredSuggestions = cards.filter((card) =>
      card.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    ).map((card) => card.name);
    setSuggestions(filteredSuggestions);
  }, [searchTerm, cards]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (suggestion: string): void => {
    setSearchTerm(suggestion);
  };

  const filterData = async (status: string): Promise<void> => {
    if (status === '') {
      await fetchAllData();
    } else if (status === 'active') {
      await fetchActiveData();
    } else if (status === 'draft') {
      await fetchDraftData();
    }
  };

  const handleStatusChange = (value: string): void => {
    setSelectedStatus(value);
    filterData(value);
  };

  const handleSearchButtonClick = () => {
    const results = cards.filter(card =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <Card>
      <h1 className='p-4 font-bold text-3xl'>Listing Dashboard</h1>
      <div className="flex flex-row justify-center w-full ">
        <div className="grid w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner /> {/* Show spinner while loading */}
            </div>
          ) : (
            searchResults.length > 0 && (
              <ScrollArea className='h-[550px] w-full rounded-md'>
                <div className='max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-col-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 p-4'>
                  {searchResults.map((card) => (
                    
                    <CardComponent
                      key={card._id}
                      id={card._id}
                      title={card.name}
                      content={card.description}
                      image={card.images && card.images.length > 0 ? card.images[0].webViewLink.slice(0,-13) : ''}  
                      price={card.priceIndia}
                      priceIndia={card.priceIndia}
                      sku={card.SKU || 'N/A'}
                      status={card.draft ? 'draft' : 'active'}
                      variants={[]}
                    />
                    
                  ))}
                </div>
              </ScrollArea>
            )
          )}
        </div>
        <div className='space-y-4 w-1/4 p-4'>
        <Link href={"/listings/newListing"}><Button className="w-full text-[10px] md:text-sm lg:text-sm xl:text-sm">+ New Listing</Button></Link>
        <div className="flex md:flex-row flex-col gap-2">

            <Input
              type="text"
              
              value={searchTerm}
              onChange={handleSearch}
              list="suggestions"
            />
            <Button  onClick={handleSearchButtonClick}><p className='text-[10px] md:text-sm lg:text-sm xl:text-sm"'>Search</p></Button>
          </div>
          <datalist id="suggestions">
            {suggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
          <Card className=''>
            <CardHeader className='p-2 sm:px-6'>
              <CardTitle className='text-[10px] sm:text-[15px] md:text-sm lg:text-sm xl:text-sm'>Listing Status</CardTitle>
            </CardHeader>
            <CardContent className='p-2 sm:px-6'>
              <RadioGroup
                value={selectedStatus}
                onValueChange={handleStatusChange}
                className=''
              >
                <div className="flex items-center space-x-2 text-sm md:text-sm lg:text-sm xl:text-sm">
                  <RadioGroupItem value="">All</RadioGroupItem>
                  <Label className='text-[8px] sm:text-sm md:text-sm lg:text-sm xl:text-sm'>All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active">Active</RadioGroupItem>
                  <Label className='text-[8px] sm:text-sm md:text-sm lg:text-sm xl:text-sm'>Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="draft">Draft</RadioGroupItem>
                  <Label className='text-[8px] sm:text-sm md:text-sm lg:text-sm xl:text-sm'>Draft</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default App;
