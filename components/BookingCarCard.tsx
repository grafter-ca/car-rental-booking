import Image from 'next/image';
import React, { useEffect } from 'react';
import { FaGasPump, FaCarSide, FaChair, FaArrowRight } from 'react-icons/fa';

interface Car {
  id: string;
  name: string;
  price: number;
  seat: number;
  carAvg: number;
  image: { url: string } | null;
  transmission?: 'Auto' | 'Manual';
  mpg?: number;
}

interface BookingCarCardProps {
  car: Car;
}

export const BookingCarCard: React.FC<BookingCarCardProps> = ({ car }) => {

    const [cardata,setCarData] = React.useState<Car>();

    useEffect(() => {
        if(car)
        {
            setCarData(car);
        }
    }, [car])

    // make it loading 
 if (!cardata) {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}

  return (
    <div className="group relative bg-white p-5 rounded-xl shadow  transition duration-300">
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
          className="object-contain rounded"
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
    </div>
  );
};
