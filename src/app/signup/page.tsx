'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { POST } from '../api/users/signup/route';


const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignup = async () => {
    try {
      const response = await fetch("/api/users/signup", {
        method: 'POST',
        body: JSON.stringify(user),
      })

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      console.log(data);

      router.push('/login')

    } catch (error: any) {
      toast.error(error.message)
    }
  }



  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'>
      <div className='container mx-auto md:py-40 lg:py-40 py-40 md:transition-all lg:transition-all'>
        <div className='flex flex-col w-10/12 lg:flex-row lg:w-10/12 md:flex-row md:w-10/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden relative'>
          <div className='lg:w-1/2 md:w-1/2 w-full relative transition-opacity'>
            <div className='aspect-square'>
            <Image
              className='md:object-contain lg:object-contain object-contain'
              src="/women computer.jpg"
              alt=''
              layout='fill'
            />
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/2 py-16 px-12 md:py-8 md:px-5 lg:px-12 lg:py-20'>
            <h1 className='text-sm font-bold text-gray-900 mb-4 md:text-xl md:font-medium'>
              Create an account
            </h1>
            <hr />
            <form action="#" className='mt-4'>
              <div className='flex flex-col gap-4 md:gap-2 lg:gap-4'>
                <label htmlFor="username" className='text-sm font-medium text-gray-900 dark:text-gray-800'>Username</label>
                <input
                  className='bg-white border border-gray-300 text-gray-900 rounded-lg p-2.5 mb-4'
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
              </div>
              <div className='flex flex-col gap-4 md:gap-2 lg:gap-4'>
                <label htmlFor="email" className='text-sm font-medium text-gray-900 dark:text-gray-800'>Email</label>
                <input
                  className='bg-white border border-gray-300 text-gray-900 rounded-lg p-2.5 mb-4'
                  id="email"
                  type="text"
                  placeholder="name@gmail.com"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className='flex flex-col gap-4 md:gap-2 lg:gap-4'>
                <label htmlFor="password" className='text-sm font-medium text-gray-900 dark:text-gray-800'>Password</label>
                <input
                  className='bg-white border border-gray-300 text-gray-900 rounded-lg p-2.5'
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
              <button
                className='py-2 px-4 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg w-fit md:mt-4'
                onClick={onSignup}
              >
                Sign Up
              </button>
              <div className='flex gap-1 mt-4 md:gap-1 md:mt-3 lg:gap-2 lg:mt-4'>
                <p className='text-xs md:text-xs lg:text-xl'>Already have an account?</p>
                <Link href="/login" className='text-xs text-indigo-400 md:text-xs lg:text-xl'>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;