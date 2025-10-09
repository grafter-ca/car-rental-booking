"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { BookingCarCard } from "./BookingCarCard";
import { Car } from "@/interfaces";

interface BookingModalProps {
  selectedCar: Car;
  onClose?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  selectedCar,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    pickupTime: "",
    dropoffTime: "",
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validateField = (name: string, value: string) => {
    if (!value) return "This field is required.";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Enter a valid email.";
    if (name === "phone" && !/^[0-9]{9,15}$/.test(value))
      return "Enter a valid phone number.";
    return "";
  };

  const getFieldError = (name: string) =>
    touched[name] ? validateField(name, formData[name as keyof typeof formData]) : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return alert("Please log in first");
    if (Object.values(formData).some((v) => !v)) {
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }

    const numberOfDays = Math.max(
      1,
      Math.ceil(
        (new Date(formData.endDate).getTime() -
          new Date(formData.startDate).getTime()) /
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

    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

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

  const isFormValid = Object.values(formData).every(Boolean);

 // ✨ Small gallery animation
const galleryImages = [
  { url: "/images/cars.png", name: "Sporty Sedan" },
  { url: "/images/cars-2.png", name: "Luxury SUV" },
  { url: "/images/cars.png", name: "Classic Coupe" },
  { url: "/images/cars-2.png", name: "Offroad Adventure" },
];

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="relative bg-white rounded-2xl shadow-2xl ring ring-blue-200 p-6 my-12 space-y-6 max-h-[85vh] overflow-y-auto"
    >

      <h3 className="font-bold text-2xl text-center text-gray-800">
        {`Rent ${selectedCar.name} Car Now`}
      </h3>

      {errorMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-600 text-base font-medium"
        >
          {errorMessage}
        </motion.p>
      )}

      {/* Car details card */}
      <BookingCarCard car={selectedCar} />

     {/* ✨ Animated Gallery Slider */}
<div className="relative w-full overflow-hidden rounded-xl mt-6">
  <motion.div
    className="flex"
    animate={{ x: [`0%`, `-100%`] }}
    transition={{
      repeat: Infinity,
      repeatType: "mirror",
      duration: 10,
      ease: "easeInOut",
    }}
  >
    {[...galleryImages, ...galleryImages].map((img, i) => (
      <motion.div
        key={i}
        className="relative w-1/2 md:w-1/3 flex-shrink-0 overflow-hidden rounded-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={img.url}
          alt={img.name || `Car ${i + 1}`}
          className="w-full h-40 object-cover"
        />

        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center"
        >
          <span className="text-white text-lg font-semibold">
            {img.name || "Car Image"}
          </span>
        </motion.div>
      </motion.div>
    ))}
  </motion.div>
</div>


      {/* Booking form */}
      <div className="grid gap-4 mt-4">
        {[
          ["name", "text", "Your Name"],
          ["email", "email", "Your Email"],
          ["phone", "tel", "Phone Number"],
        ].map(([name, type, placeholder]) => (
          <div key={name}>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border ${
                getFieldError(name) ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 w-full`}
            />
            {getFieldError(name) && (
              <p className="text-red-500 text-sm mt-1">
                {getFieldError(name)}
              </p>
            )}
          </div>
        ))}

        <div className="flex gap-2">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`border ${
              getFieldError("startDate")
                ? "border-red-500"
                : "border-gray-300"
            } rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 w-full`}
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`border ${
              getFieldError("endDate") ? "border-red-500" : "border-gray-300"
            } rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 w-full`}
          />
        </div>

        <div className="flex gap-2">
          <input
            type="time"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 w-full"
          />
          <input
            type="time"
            name="dropoffTime"
            value={formData.dropoffTime}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 w-full"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing...
            </>
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>
    </motion.form>
  );
};
