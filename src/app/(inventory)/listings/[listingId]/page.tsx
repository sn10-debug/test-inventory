'use client';
import React from 'react'
import Image from 'next/image';
import jsonData from '@/data/listingData.json';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
export default function page({params}:{
    params:{
        listingId: number;
    }
}){
    const {listingData,listingForm}=jsonData;
    return (
        <div>
            {listingData.filter((item)=>item.id==params.listingId).map((item)=>(
                <div key={item.id} className='grid grid-col-2'>
                    {listingForm.map((form)=>(
                        <div className=''>
                            <label>{form.label}</label>
                            {form.type==="file"?
                            <Input id="picture" type="file" multiple/>:
                            form.label==="edit title"?
                            <Input defaultValue={item.title} type={form.type}/>:
                            form.label==="edit sku"?
                            <Input defaultValue={item.sku} type={form.type}/>:
                            form.label==="edit price"?
                            <Input defaultValue={item.price} type={form.type}/>:
                            <Input defaultValue={item.priceIndia} type={form.type}/>
                            }
                        </div>
                        ))}
                </div>
            )
            )}
            <Button>save change</Button>
    </div>
    )
}