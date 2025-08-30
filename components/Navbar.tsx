"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

const Navbar = () => {
 const { isSignedIn, user, isLoaded } = useUser();
  return (


    <div className='flex items-center justify-between py-2 px-5 shadow-sm border-b-[1px] border-gray-100'>
        <Image
        src="/images/logo.png"
        alt='Logo image'
        width={100}
        height={100}
        />
        <div className='hidden md:flex gap-5'>
          <Link href="/">
            <h2 className='hover:bg-blue-500 rounded-full px-3 py-2 cursor-pointer hover:text-white'>Home</h2>
          </Link>
          <Link href="/history">
            <h2 className='hover:bg-blue-500 rounded-full px-3 py-2 cursor-pointer hover:text-white'>History</h2>
          </Link>
          <Link href="/contact">
            <h2 className='hover:bg-blue-500 rounded-full px-3 py-2 cursor-pointer hover:text-white'>Contact Us</h2>
          </Link>
        </div>
        <div>

            {isSignedIn ? <UserButton /> : <FaUser size={30} />}
        </div>
    </div>
  )
}

export default Navbar
