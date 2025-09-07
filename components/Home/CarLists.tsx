import React,{useState} from "react";
import { CarCard } from "../CarCard";
import { CarCardSkeleton } from "../CarCardSkeleton";
import { BookingModal } from "../BookingModal";
import { Car } from "@/interfaces";

interface CarListsProps {
  carsList: Car[];
}

export const CarLists: React.FC<CarListsProps> = (props) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  if (isLoaded && props.carsList.length > 0) {
    setTimeout(() => {
      setIsLoaded(false);
    }, 1000);
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 mt-6">
      {isLoaded
        ? [1, 2, 3, 4].map((_, index) => <CarCardSkeleton key={index} />)
        : props.carsList.map((car, index) => (
            <div
              key={index}
              onClick={() => {
                const modal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
                if (modal) {
                  modal.showModal();
                }

                setSelectedCar(car);
              }}
            >
              <CarCard car={car} />
            </div>
          ))}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
        {selectedCar && <BookingModal selectedCar={selectedCar} />}
      </dialog>
    </div>
  );
};
