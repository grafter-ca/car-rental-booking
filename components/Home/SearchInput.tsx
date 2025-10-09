"use client";
import React, { useState } from "react";
import { Car } from "@/interfaces";

interface SearchInputProps {
  carsList: Car[];
  onFilteredCars: (filtered: Car[]) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ carsList, onFilteredCars }) => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    let filteredCars = carsList;

    // Filter by location keyword
    if (location.trim() !== "") {
      filteredCars = filteredCars.filter((car) =>
        car.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by date availability
    if (date) {
      filteredCars = filteredCars.filter((car) => {
        const availableDates = car.availableDates || [];
        return availableDates.includes(date);
      });
    }

    onFilteredCars(filteredCars);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <h1 className="text-center text-gray-400 text-2xl">
        Let’s search what you need
      </h1>

      <div className="flex justify-center items-center divide-x divide-gray-300 space-x-3 bg-gray-200 px-3 py-1 rounded-full shadow-md">
        {/* Location Input */}
        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-gray-700 border-none outline-none bg-transparent mr-2 w-[80px] md:w-[120px]"
          />
        </div>

        {/* Date Input */}
        <div className="pl-0">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="text-gray-700 border-none outline-none bg-transparent  mr-4"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition cursor-pointer"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
