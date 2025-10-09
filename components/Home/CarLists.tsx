"use client";
import React, { useState, useEffect } from "react";
import { CarCard } from "../CarCard";
import { CarCardSkeleton } from "../CarCardSkeleton";
import { BookingModal } from "../BookingModal";
import Modal from "../Modal";
import { Car } from "@/interfaces";

interface CarListsProps {
  carsList: Car[];
}

export const CarLists: React.FC<CarListsProps> = ({ carsList }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (carsList.length > 0) {
      const timer = setTimeout(() => setIsLoaded(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [carsList]);

  const openModal = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
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

      {/* ✅ React-controlled Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedCar && <BookingModal selectedCar={selectedCar} />}
      </Modal>
    </section>
  );
};
