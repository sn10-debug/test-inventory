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
    const [newFiles, setNewFiles] = useState<File[]>([]);

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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setNewFiles(prevFiles => [...prevFiles, ...filesArray]);
        }
    };

    const handleRemove = (index: number) => {
        setNewFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    if (!item) {
        return <div>Listing not found</div>;
    }

    return (
        <Card className='p-6 shadow-md'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

                <div className='flex flex-col space-y-2'>
                    <Label htmlFor="picture" className='font-semibold text-gray-700'>Picture</Label>
                    <Input id="picture" type="file" multiple {...register('picture')} onChange={handleFileChange} />
                    {errors.picture && <span className='text-red-500'>{errors.picture.message}</span>}
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {item.images.map((image, index) => (
                            <div key={index} className="relative">
                                <img src={image} alt={`image-${index}`} className="h-24 w-24 object-cover" />
                                <Button type="button" onClick={() => handleRemove(index)} className="absolute top-0 right-0 bg-red-500 text-white">Remove</Button>
                            </div>
                        ))}
                        {newFiles.map((file, index) => (
                            <div key={index} className="relative">
                                {file.type.startsWith("image/") ? (
                                    <img src={URL.createObjectURL(file)} alt={`new-image-${index}`} className="h-24 w-24 object-cover" />
                                ) : (
                                    <video src={URL.createObjectURL(file)} className="h-24 w-24 object-cover" controls />
                                )}
                                <Button type="button" onClick={() => handleRemove(index)} className="absolute top-0 right-0 bg-red-500 text-white">Remove</Button>
                            </div>
                        ))}
                    </div>
                </div>
                <Button type="submit" className='w-full'>Save Changes</Button>
            </form>
        </Card>
    );
}
