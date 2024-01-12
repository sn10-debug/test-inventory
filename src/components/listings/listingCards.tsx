import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { Button } from '../ui/button';
const listingCards = ({filteredData}: {filteredData: any}) => {
  return (
      <ScrollArea className="h-[570px] w-full rounded-md">
      <div className='max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-col-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 p-4'>
        {filteredData.map((item:any) => (      
        <Card className='' >
          <Image 
            src={item?.image}
            width={500}
            height={500}
            alt="product image"
            className='w-full h-80 hover:scale-105 object-contain md:object-contain xl:object-fill lg:object-contain'
          />
          <CardHeader><CardTitle>{item.title}</CardTitle></CardHeader>
          <CardContent className='space-y-2' key={item.id}> 
            <div className='text-gray-500 text-sm'>SKU : {item.sku}</div>
            <div className='text-gray-500 text-sm'>Price(Indian) : {item.priceIndia}</div>
            <div className='text-gray-500 text-sm'>Price(Everywhere) : {item.price}</div>
            <div className='flex flex-row items-center justify-between'>
            <div ><Input className='' type='checkbox'></Input></div>
            <div>
<DropdownMenu>
      <DropdownMenuTrigger asChild>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href={{pathname:`/listings/${item?.id}`}} key={item.id}>
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
        
        ))}
      </div>
      </ScrollArea>

  )
}

export default listingCards
