'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('username is required').min(3, "username must have at least 3 characters").max(12, "Username must not be more than 12 characters"),
  password: Yup.string().required('Password is required').min(4, "Password must be atleast of 4 characters").max(12, "password mustn`t be more than 12 characters"),
});


const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({  
            username: values.username,
            password: values.password,
          })
        })

        const data = await response.json();
        
        alert(JSON.stringify(data));
        
        if (!response.ok) {
          throw new Error(data.error);
        }

        router.push('/dashboard');
    
      } catch (error: any) {
          toast.error(error.message);
          router.push('/')
      }

      } 
  })

  const { handleSubmit, handleChange, values, errors, touched } = formik;



  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-purple-500'>
        <div className='container mx-auto md:py-40 lg:py-40 py-40 md:transition-all lg:transition-all'>
          <div className='flex flex-col w-10/12 lg:flex-row lg:w-10/12 md:flex-row md:w-10/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden relative'>
            <div className='lg:w-1/2 md:w-1/2 w-full relative transition-opacity'>
              <div className='aspect-square'>
                <Image
                  className='object-contain md:object-contain lg:object-contain'
                  src="/women-headset.jpg"
                  alt=''
                  layout='fill'
                />
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/2 py-4 px-4 md:py-8 md:px-5 lg:px-12 lg:py-20'>
              <h1 className='text-sm font-bold text-gray-900 mb-4 md:text-xl md:font-medium lg:text-3xl lg:font-bold'>
                Log in to your account
              </h1>
              <hr />
              <form action="#" className='mt-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-2 md:gap-2 lg:gap-4'>
                  <label htmlFor="username" className='text-sm font-medium text-gray-900 dark:text-gray-800'>Username</label>
                  <input
                    className={`bg-white border ${errors.username && touched.username ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg p-2.5`}
                    id="username"
                    type="text"
                    placeholder="Enter your Username"
                    value={values.username}
                    onChange={handleChange}
                  />
                  {errors.username && touched.username && (
                    <span className="text-red-500 text-sm mb-4">{errors.username}</span>
                  )}
                </div>
                <div className='flex flex-col gap-2 md:gap-2 lg:gap-4 mt-2'>
                  <label htmlFor="password" className='text-sm font-medium text-gray-900 dark:text-gray-800'>Password</label>
                  <input
                    className={`bg-white border ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg p-2.5`}
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password && (
                    <span className="text-red-500 text-sm">{errors.password}</span>
                  )}
                </div>
                <button
                  className='py-2 px-4 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg w-fit'
                  type='submit'
                >
                  LogIn
                </button>
                <div className='flex gap-2 mt-4 md:gap-1 md:mt-3 lg:gap-2 lg:mt-4'>
                  <p className='text-xs md:text-xs lg:text-xl'>Don`t have an account?</p>
                  <Link href="/signup" className='text-xs text-indigo-400 md:text-xs lg:text-xl'>
                    SignUp
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;