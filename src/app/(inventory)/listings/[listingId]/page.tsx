'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '@/components/ui/card';
import Spinner from '@/components/ui/spinner'; // Import the spinner component
import { Textarea } from '@/components/ui/textarea';
import Modal from 'react-modal'; // Import react-modal
import { Carousel } from 'react-responsive-carousel'; // Import react-responsive-carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const listingSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
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
    const [loading, setLoading] = useState(true);
    const [removedImages, setRemovedImages] = useState<number[]>([]);
    const [showFileInput, setShowFileInput] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
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
            finally {
                setLoading(false);
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

    const handleRemoveOld = (index: number) => {
        setRemovedImages(prev => [...prev, index]);
    };

    const openModal = () => {
        const oldImages = item ? item.images.filter((_, index) => !removedImages.includes(index)) : [];
        const newImages = newFiles.map(file => URL.createObjectURL(file));
        setModalImages([...oldImages, ...newImages]);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (!item) {
        return loading ? <div className='flex justify-center items-center'> <Spinner /></div> : <div>Item not found</div>;
    }

    const addPhotos = () => {
        setShowFileInput(true);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <Card className='p-6 shadow-md bg-gray-100'>
                <div className='flex flex-col space-y-6'>
                    <div className="">
                        <CardTitle>Title</CardTitle>
                    </div>
                    <Input
                        type="text"
                        placeholder="Title"
                        defaultValue={item.name}
                        {...register('title')}
                    />
                    
                    <div className="flex justify-between items-center">
                        <CardTitle>Photos and videos</CardTitle>
                        <Button variant={'outline'} type="button" onClick={addPhotos}>Add</Button>
                    </div>
                    {showFileInput && (
                        <Input id="picture" type="file" multiple {...register('picture')} onChange={handleFileChange} />
                    )}
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {item.images.map((image, index) => (
                            !removedImages.includes(index) && (
                                <Card key={index} className='flex flex-col' onClick={openModal}>
                                    <CardContent></CardContent>
                                    <CardContent className='relative flex items-center'>
                                        <img src={image} alt={`image-${index}`} className="w-full h-auto" />
                                        <Button 
                                            type="button" 
                                            onClick={() => handleRemoveOld(index)} 
                                            variant={'destructive'}
                                            className="absolute top-0 m-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                        ))}
                        {newFiles.map((file, index) => (
                            <Card key={index} className='flex flex-col' onClick={openModal}>
                                <CardContent></CardContent>
                                <CardContent className='relative flex items-center'>
                                    {file.type.startsWith("image/") ? (
                                        <img src={URL.createObjectURL(file)} alt={`new-image-${index}`} />
                                    ) : (
                                        <video src={URL.createObjectURL(file)} controls />
                                    )}
                                    <Button 
                                        type="button" 
                                        onClick={() => handleRemove(index)} 
                                        variant={'destructive'}
                                        className="absolute top-0 m-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </Button>                            
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    
                    <CardTitle>Description</CardTitle>
                    <Textarea
                        placeholder="Description"
                        className='h-32'
                        defaultValue={item.description}
                        {...register('description')}
                    />
                    <div className='flex flex-row space-x-6'>
                        <div className='space-y-4'>
                            <CardTitle>Price(Indian)</CardTitle>
                            <Input
                                type="text"
                                placeholder="Price(India)"
                                defaultValue={item.commonPrice}
                                {...register('priceIndia')}
                            />
                        </div>
                        <div className='space-y-4'>
                            <CardTitle>Price(Everywhere)</CardTitle>
                            <Input
                                type="text"
                                placeholder="Price(Everywhere)"
                                defaultValue={item.commonPrice}
                                {...register('price')}
                            />
                        </div>
                        <div className='space-y-4'>
                            <CardTitle>Discount(Indian)</CardTitle>
                            <Input
                                type="text"
                                placeholder="Discount(India)"
                                defaultValue={''}
                            />
                        </div>
                        <div className='space-y-4'>
                            <CardTitle>Discount(Everywhere)</CardTitle>
                            <Input
                                type="text"
                                placeholder="Discount(Everywhere)"
                                defaultValue={''}
                            />
                        </div>
                        <div className='space-y-4'>
                            <CardTitle>Quantity</CardTitle>
                            <Input
                                type="text"
                                placeholder="Quantity"
                                defaultValue={item.commonQuantity}
                            />
                        </div>
                    </div>
                </div>
            </Card>
            <Button type="submit" className='w-full'>Save Changes</Button>
            
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Image Carousel"
                className="relative  inset-0 flex items-center justify-center p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
            >
                
                <div className="bg-white rounded-lg p-8 w-2/6 h-2/4 space-y-4 ">
                <div className='flex justify-end'>
                <Button onClick={closeModal} variant={'destructive'} className='flex'>
                    &times;
                </Button>
                </div>
                    <Carousel showThumbs={true} dynamicHeight={true}>
                        {modalImages.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`carousel-${index}`} className="" />
                            </div>
                        ))}
                    </Carousel>
                   
                </div>
               
            </Modal>
        </form>
    );
}
