"use client";
import React, { useState, useEffect } from "react";
import { CarCard } from "../CarCard";
import { CarCardSkeleton } from "../CarCardSkeleton";
import { BookingModal } from "../BookingModal";
import { Car } from "@/interfaces";

interface CarListsProps {
  carsList: Car[];
}

export const CarLists: React.FC<CarListsProps> = ({ carsList }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    if (carsList.length > 0) {

      const timer = setTimeout(() => setIsLoaded(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [carsList]);

  const openModal = (car: Car) => {
    setSelectedCar(car);
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement | null;
    if (modal) modal.showModal();
  };

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 mt-6">
        {isLoaded
          ? [1, 2, 3, 4].map((_, index) => <CarCardSkeleton key={index} />)
          : carsList.map((car, index) => (
              <div
                key={index}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => openModal(car)}
              >
                <CarCard car={car} />
              </div>
            ))}
      </div>

      {/* Booking Modal */}
      <dialog
        id="my_modal_1"
        className="modal modal-middle max-w-3xl w-full rounded-lg bg-white p-0 shadow-2xl ring ring-blue-200"
      >
        <div className="p-4">
          {selectedCar && <BookingModal selectedCar={selectedCar} />}
        </div>
      </dialog>
    </section>
  );
};
