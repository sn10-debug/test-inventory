'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Define the Zod schema
const listingSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    sku: z.string().min(1, 'SKU is required'),
    price: z.string().min(1, 'Price cannot be empty').regex(/^\d+(\.\d{1,2})?$/, 'Price must be a positive number'),
    priceIndia: z.string().min(1, 'Price cannot be empty').regex(/^\d+(\.\d{1,2})?$/, 'Price must be a positive number'),
    picture: z.any().array().nonempty('At least one picture is required')
});

type ListingFormSchema = z.infer<typeof listingSchema>;
type ListingData = {
    soldQuantity: any;
    _id: string;
    name: string;
    description: string;
    images: string[];
    commonPrice: number;
    commonQuantity: number;
    variants: Array<{
        label: string;
        value: string;
        SKU: string;
    }>;
};

export default function Page({ params }: { params: { listingId: string } }) {
    const [item, setItem] = useState<ListingData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get<ListingData[]>(`http://bohotree.vercel.app/api/v1/listing`);
                const activeListings = await axios.get<ListingData[]>(`http://bohotree.vercel.app/api/v1/listing/active`);
                const draftListings = await axios.get<ListingData[]>(`http://bohotree.vercel.app/api/v1/listing/draft`);
                
                const allListings = [...data, ...activeListings.data, ...draftListings.data];
                const filteredListings = allListings.filter(listing => !listing.soldQuantity);
                const listingItem = filteredListings.find(item => item._id === params.listingId);
                setItem(listingItem || null);
            } catch (error) {
                console.error('Error fetching the listings:', error);
            }
        };
        fetchData();
    }, [params.listingId]);

    const { register, handleSubmit, formState: { errors } } = useForm<ListingFormSchema>({
        resolver: zodResolver(listingSchema)
    });

    const onSubmit = (data: ListingFormSchema) => {
        console.log(data);
    };

    if (!item) {
        return <div>Listing not found</div>;
    }

    return (
        <Card className='p-6 shadow-md'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='flex flex-col space-y-2'>
                    <Label htmlFor="title" className='font-semibold text-gray-700'>Title</Label>
                    <Input id="title" type="text" defaultValue={item.name} {...register('title')} />
                    {errors.title && <span className='text-red-500'>{errors.title.message}</span>}
                </div>
                <div className='flex flex-col space-y-2'>
                    <Label htmlFor="sku" className='font-semibold text-gray-700'>SKU</Label>
                    <Input id="sku" type="text" defaultValue={item.variants[0]?.SKU || ''} {...register('sku')} />
                    {errors.sku && <span className='text-red-500'>{errors.sku.message}</span>}
                </div>
                <div className='flex flex-col space-y-2'>
                    <Label htmlFor="price" className='font-semibold text-gray-700'>Price</Label>
                    <Input id="price" type="text" defaultValue={item.commonPrice.toString()} {...register('price')} />
                    {errors.price && <span className='text-red-500'>{errors.price.message}</span>}
                </div>
                <div className='flex flex-col space-y-2'>
                    <Label htmlFor="priceIndia" className='font-semibold text-gray-700'>Price India</Label>
                    <Input id="priceIndia" type="text" defaultValue={item.commonPrice.toString()} {...register('priceIndia')} />
                    {errors.priceIndia && <span className='text-red-500'>{errors.priceIndia.message}</span>}
                </div>
                <div className='flex flex-col space-y-2'>
                    <Label htmlFor="picture" className='font-semibold text-gray-700'>Picture</Label>
                    <Input id="picture" type="file" multiple {...register('picture')} />
                    {errors.picture && <span className='text-red-500'>{errors.picture.message}</span>}
                </div>
                <Button type="submit" className='w-full'>Save Changes</Button>
            </form>
        </Card>
    );
}
