import Link from 'next/link'
import React from 'react'

 const Cancel = () => {
  return (
    <div className='max-w-2xl mx-auto py-20'>
        <h1 className='text-3xl font-bold text-center py-10'>Your payment has been cancelled</h1>
        <p className='text-center'>You can go back to the home page and try again.</p>

        <div className='flex justify-center py-10'>
            <Link href='/' className='bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition duration-300'>Go to Home</Link>
        </div>
    </div>
  )
}

export default Cancel
