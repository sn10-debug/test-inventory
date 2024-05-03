'use client';
import React, { useState, useEffect } from 'react';
import data from "@/data/listingData.json";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
const CardComponent = ({ title, content,id,image,sku,price,priceIndia }:{title:any,content:any,id:any,image:any,sku:any,price:any,priceIndia:any}) => {
    return (
     
    
        <Card className='' >
          <Image 
            src={image}
            width={500}
            height={500}
            alt="product image"
            className='w-full h-80 hover:scale-105 object-contain md:object-contain xl:object-fill lg:object-contain'
          />
          <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
          <CardContent className='space-y-2'> 
            <div className='text-gray-500 text-sm'>SKU : {sku}</div>
            <div className='text-gray-500 text-sm'>Price(Indian) :{price} </div>
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
                    <Link href={{pathname:`/listings/${id}`}} key={id}>
                    <DropdownMenuItem>
                        Edit
                    </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Deactivate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Renew
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            </div>
            </div>
          </CardContent>
        </Card>
      
    );
};

const App = () => {
    const [cards, setCards] = useState<{ listingData: { id: number; title: string; sku: string; price: string; priceIndia: string; image: string; }[]; listingForm: { id: number; label: string; type: string; }[]; }>(data);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]); // State for search suggestions
    const [selectedStatus, setSelectedStatus] = useState('');
  useEffect(() => {
    const filteredSuggestions = [...data.listingData].filter((card) =>
      card.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    ).map((card) => card.title); // Example logic

    setSuggestions(filteredSuggestions);
  }, [searchTerm]);

  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion); // Update search term based on clicked suggestion
  };
  const filterData = (status:any) => {
    const filteredCards =
      status === ''
        ? data.listingData
        : data.listingData.filter((card) => card.status.toLowerCase() === status.toLowerCase());
    setCards({ listingData: filteredCards, listingForm: data.listingForm });
  };
  const handleStatusChange = (value:any) => {
    setSelectedStatus(value);
    filterData(value);
  };
  useEffect(() => {
    filterData('');
  }, []);
  return (
    <Card>
    <div className="flex flex-row justify-center w-full">
      
      <div className="grid w-3/4"> {/* Only display cards after search button click */}
        {cards.listingData.length > 0 && (
          <ScrollArea className='h-[600px] w-full rounded-md'>
                                <div className='max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-col-2 lg:grid-cols-2 xl:grid-cols-3  gap-10 p-4'>
            {cards.listingData.map((card) => (
               

                        <CardComponent key={card.id} id={card.id} title={card.title} content={card.price} image={card.image} price={card.price} priceIndia={card.priceIndia} sku={card.sku}/>
               
            ))}
                                </div>

          </ScrollArea>
        )}
      </div>
      <div className='space-y-4 w-1/4 p-4'>
      <Link href={"/listings/newListing"}><Button className="w-full text-[10px] md:text-sm lg:text-sm xl:text-sm">+ New Listing</Button></Link>

      <div className="flex md:flex-row flex-col gap-2">

        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          list="suggestions" // Add list attribute for suggestions
        />
      <datalist id="suggestions"> {/* Datalist element for suggestions */}
          <div className='w-full'>
          {suggestions.map((suggestion) => (
            <option key={suggestion} value={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </option>
          ))}
          </div>
          
        </datalist>
        
        <Button onClick={() => { // Perform search and update cards
          const filteredCards = data.listingData.filter((card) =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setCards({ listingData: filteredCards, listingForm: data.listingForm });
        }}>
          Search
        </Button>
        
      </div>
      <>
        <h1 className='font-bold'>Listing Status</h1>
        <RadioGroup defaultValue={selectedStatus} onValueChange={handleStatusChange}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="" id="all" />
    <Label htmlFor="all">All</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="active" id="option-one" />
    <Label htmlFor="option-one">Active</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="draft" id="option-two" />
    <Label htmlFor="option-two">Draft</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="expired" id="option-three" />
    <Label htmlFor="option-three">Expired</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="soldout" id="option-four" />
    <Label htmlFor="option-four">Sold Out</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="inactive" id="option-five" />
    <Label htmlFor="option-five">Inactive</Label>
  </div>
</RadioGroup>
    </>
      </div>
    </div>
    </Card>
  );
};

export default App;
