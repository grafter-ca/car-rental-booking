import { Car, CarCardProps } from '@/interfaces';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { FaGasPump, FaCarSide, FaChair, FaArrowRight } from 'react-icons/fa';

export const CarCard: React.FC<CarCardProps> = ({ car }) => {

    const [cardata,setCarData] = React.useState<Car>();

    useEffect(() => {
        if(car)
        {
            setCarData(car);
        }
    }, [car])

    if(cardata === undefined) {
        return <div className='flex items-center justify-center'>Loading...</div>;
    }

  return (
    <div className="group relative bg-white p-5 rounded-xl shadow hover:shadow-lg hover:border hover:border-gray-400 transition duration-300">
      {/* Car Name */}
      <h2 className="text-lg font-medium capitalize mb-1">{cardata.name}</h2>

      {/* Car Price */}
      <p className="text-xl font-bold mb-3">
        <span className="text-sm font-light">$</span>
        {cardata.price}
        <span className="text-sm font-light">/day</span>
      </p>

      {/* Car Image */}
      <div className="w-full h-40 relative mb-10">
        <Image
          src={cardata.image?.url || '/images/default-car.png'}
          alt={cardata.name}
          fill
          className="object-contain rounded transition duration-300 group-hover:opacity-70 group-hover:scale-105"
        />
      </div>

      {/* Features Icons */}
      <div className="flex justify-between text-gray-500 text-sm mb-3 px-4">
        <div className="flex items-center gap-1">
          <FaCarSide /> {cardata.transmission || 'Auto'}
        </div>
        <div className="flex items-center gap-1">
          <FaChair /> {cardata.seat} Seat
        </div>
        <div className="flex items-center gap-1">
          <FaGasPump /> {cardata.mpg || 25} MPG
        </div>
      </div>

      {/* Rent Now button on hover */}
      <button
        className="absolute flex items-center justify-center bottom-5 left-1/2 -translate-x-1/2 bg-blue-700 text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[90%]"
        onClick={() => alert(`You have selected to rent the ${cardata.name}`)}
        aria-label={`Rent ${cardata.name}`}
      >
        Rent Now
        <FaArrowRight className="ml-2" />
      </button>
    </div>
  );
};
