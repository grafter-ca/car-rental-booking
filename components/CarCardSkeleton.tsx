import React from 'react'

export const CarCardSkeleton = () => {
  return (
    <div>
        <div className="animate-pulse flex flex-col gap-2 border border-gray-300 shadow rounded-md p-4 w-full">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
            <div className="bg-gray-300 h-40 w-full mb-4 rounded"></div>
            <div className="flex justify-between mt-4">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
        </div>
    </div>
  )
}
