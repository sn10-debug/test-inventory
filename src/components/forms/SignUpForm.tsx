'use client';

import React from 'react'
import {useForm} from 'react-hook-form';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
const FormSchema = z.object({
  name:z.string().min(1,'name is required'),
  email: z.string().min(1,'Email is required').email('Invalid email'),
  password: z.string().min(1,'Password is required').min(8,'Password must be 8 characters long'),
  confirmPassword: z.string().min(1,'Password is required').min(8,'Password must be 8 characters long'),
})
.refine((data)=>data.password ===data.confirmPassword,{
    path:['confirmPassword'],
    message:'Passwords do not match'
})

export default function SignInForm() {
  const iconsTab = [
    { icon: <AiOutlineGoogle /> },
  ];
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver:zodResolver(FormSchema),
  })
  const onSubmit=()=>{
    console.log('form submitted')
  }
  return (
    <Form {...form}>
    <form method='POST' action={"http://localhost:8000/auth/register"} className="w-full">
    <div className="flex justify-evenly text-2xl font-bold">Create your account</div>
    <div className='space-y-2 mt-6'>
    <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type='name' placeholder="Enter your username"  {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type='email' placeholder="Enter your email"  {...field} />
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
          </FormItem>
        )}
      />
            <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input type='password' placeholder="Repeat your password" {...field} />
            </FormControl> 
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
      <Button className='w-full mt-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-[69px]' type="submit">Sign up</Button>
    </form>
    <div className='mt-6 w-full '>
      <p>Already have an account?<Link className='ml-1 text-gray-500 hover:text-gray-900' href='/login'>Login</Link></p> 
      </div>
  </Form>

  )
}
