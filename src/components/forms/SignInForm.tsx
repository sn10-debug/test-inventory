'use client';

import React from 'react'
import {useForm} from 'react-hook-form';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import { NextRequest, NextResponse } from 'next/server';
const FormSchema = z.object({
  username: z.string().min(1,'Email is required').email('Invalid email'),
  password: z.string().min(1,'Password is required').min(8,'Password must be 8 characters long'),
})


export default function SignInForm(error:any) {
  const handleLogin =()=>{
    if(error){
      alert('there was an error')
  }else{
    alert('login successful')
  }
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver:zodResolver(FormSchema),
  })
  const onSubmit=()=>{
    console.log('form submitted')
  }
  
  const iconsTab = [
    { icon: <AiOutlineGoogle /> },

  ];
 
  return (
    <Form {...form}>
    <form action={"http://localhost:8000/auth/login"} method='POST' className="w-full">
    <div className="flex justify-evenly text-2xl font-bold">Login</div>
    <div className='space-y-2 mt-6'>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type='email' placeholder="Enter your Email"  {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type='password' placeholder="Enter your password" {...field} />
            </FormControl> 
            <FormMessage />
            <p><Link className='ml-1 text-gray-500 hover:text-gray-900 text-sm' href='/login/forgotpassword'>Forgot Password?</Link></p>
          </FormItem>
        )}
      />
      </div>
      <Button className='w-full mt-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-[69px]' type="submit" onClick={handleLogin}>login</Button>
    </form>
    <div className='mt-6 w-full '>
      <p>Don’t have an account?<Link className='ml-1 text-gray-500 hover:text-gray-900' href='/signup'>Register</Link></p>
      <p className="mt-6 flex justify-around text-sm font-light">Or Sign up using</p>
      <div className='mt-2 space-x-2 flex justify-center '>
      
     <a href='http://localhost:8000/auth/google'> <div className="flex gap-7 text-[38px] text-gray-300 justify-center md:justify-start">
                {iconsTab.map(({ icon }, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer hover:text-gray-500"
                      style={{ transition: "all 0.3s" }}
                    >
                      {icon}
                    </div>
                  );
                })}
              </div>
              </a>
              </div> 
    </div>


  </Form>

  )
}
