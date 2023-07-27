'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {

  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-purple-500'>
      <div className='container mx-auto py-40'>
        <div className='flex w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden relative'>
          <div className='w-1/2 relative'>
            <Image
              src="/women-headset.jpg"
              alt=''
              layout='fill'
              objectFit='contain'
            />
          </div>
          <div className='w-1/2 py-16 px-12'>
            <h1 className='text-3xl font-bold text-gray-900 mb-4'>
              Log in to your account
            </h1>
            <hr />
            <form action="#" className='mt-4'>
              <div className='flex flex-col gap-4'>
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
              <div className='flex flex-col gap-4'>
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
                className='py-2 px-4 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg w-fit'
                onClick={onLogin}
              >
                LogIn
              </button>
              <div className='flex gap-2 mt-4'>
                <p className='text-lg'>Don`t have an account?</p>
              <Link href="/signup" className='text-lg text-indigo-400'>     
                SignUp
              </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;