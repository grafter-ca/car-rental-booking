import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <>
    <div className='flex items-center md:hidden gap-5 mb-6 p-4 bg-gradient-to-r from-blue-200 to-gray-200 rounded-full'>
          <Link href="/">
            <h2 className='hover:text-blue-500 rounded-full px-3 py-1 cursor-pointer hover:animate-pulse'>Home</h2>
          </Link>
          <Link href="/history">
            <h2 className='hover:text-blue-500 rounded-full px-3 py-1 cursor-pointer hover:animate-pulse'>History</h2>
          </Link>
          <Link href="/contact">
            <h2 className='hover:text-blue-500 rounded-full px-3 py-1 cursor-pointer hover:animate-pulse'>Contact Us</h2>
          </Link>
        </div>
    <div className='grid grid-cols-1 md:grid-cols-2 mb-14'>
        <div className='mb-4'>
            <div className='font-bold text-4xl lg:text-5xl capitalize space-y-3 py-3'>
            <h1>Premium Car</h1>
            <h2> <span className='text-blue-500 font-bold animate-pulse'>Rental</span> in your area</h2>
            </div>
           <div>
           <p>Book the selected car effortlessly ,Pay for driving only,</p>
           <p>Book the Car Now</p>
           </div>
           <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 mt-8 rounded-full cursor-pointer animate-bounce hover:animate-none transition ease-linear'>
            Explore Cars
           </button>
        </div>
        <div>
            <Image 
            src='/images/cars.png'
            alt='Hero image'
            width={500}
            height={400}
            className='border rounded-lg border-gray-50 py-1 hover:scale-105 hover:opacity-70 transition duration-500'
            />
        </div>
    </div>
    </>
  )
}

export default Hero
