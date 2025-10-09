"use client";
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useUser } from "@clerk/nextjs";
import { BookingCarCard } from "./BookingCarCard";
import { Car } from "@/interfaces";

interface BookingModalProps {
  selectedCar: Car;
}

export const BookingModal: React.FC<BookingModalProps> = ({ selectedCar }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    pickupTime: "",
    dropoffTime: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      return alert("Please log in first");
    }

    const numberOfDays = Math.max(
      1,
      Math.ceil(
        (new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );

    const cart = [
      {
        hygraphId: selectedCar.id,
        name: selectedCar.name,
        price: selectedCar.price,
        quantity: numberOfDays,
      },
    ];

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    try {
      setIsLoading(true);
      const Server_uri =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";
      const response = await fetch(`${Server_uri}/api/booking/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkUserId: user.id,
          cart,
          totalAmount,
          bookingDetails: formData,
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data);
        setErrorMessage("Checkout failed, please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMessage("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const isFormValid = Object.values(formData).every(Boolean);

  return (
    <form
      method="dialog"
      onSubmit={handleSubmit}
      className="modal-box bg-white rounded-lg shadow-2xl ring ring-blue-200 p-6 my-6 relative space-y-4"
    >
      <button
        type="button"
        aria-label="Close modal"
        onClick={() =>
          (document.getElementById("my_modal_1") as HTMLDialogElement)?.close()
        }
        className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
      >
        <IoClose size={24} />
      </button>

      {errorMessage && (
        <p className="text-center text-red-600 text-base font-medium">
          {errorMessage}
        </p>
      )}

      <h3 className="font-bold text-xl">Rent A Car Now!</h3>

      <div className="space-y-4">
        <BookingCarCard car={selectedCar} />

        <div className="flex flex-col gap-4">
          <div className="flex space-x-2">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 w-full"
            />
          </div>

          <div className="flex space-x-2">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 w-full"
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 w-full"
            />
          </div>

          <div className="flex space-x-2">
            <input
              type="time"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 w-full"
            />
            <input
              type="time"
              name="dropoffTime"
              value={formData.dropoffTime}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 w-full"
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300 w-full"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>
    </form>
  );
};
