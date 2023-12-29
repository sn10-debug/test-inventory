import SignInForm from '@/components/SignInForm';
import React from 'react';
import { cookies } from 'next/headers'
 
export default async function page() {
  const cookieStore = cookies()
  const error = cookieStore.get('error')
  if(error){
    return (
      <div className='w-full'>
        <SignInForm error={error} />
      </div>
    )
    
  }else{
    return (
      <div className='w-full'>
        <SignInForm />
      </div>
    )
  }
}