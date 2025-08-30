import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='mb-4 mt-12'>
            <div className='font-bold text-4xl lg:text-5xl capitalize space-y-3 py-3'>
            <h1>Premium Car</h1>
            <h2> <span className='text-blue-500 font-bold'>Rental</span> in your area</h2>
            </div>
           <div>
           <p>Book the selected car effortlessly ,Pay for driving only,</p>
           <p>Book the Car Now</p>
           </div>
           <button className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 mt-4 rounded-full cursor-pointer'>
            Explore Cars
           </button>
        </div>
        <div>
            <Image 
            src='/images/cars.png'
            alt='Hero image'
            width={500}
            height={400}
            className='border rounded-lg border-gray-50 py-2 hover:scale-105 hover:opacity-70 transition-all transition-300'
            />
        </div>
    </div>
  )
}

export default Hero
