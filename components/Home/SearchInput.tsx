import React from "react";

const SearchInput = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <h1 className="text-center text-gray-300 text-xl">
        Lets Search what you need
      </h1>
      <div className="flex justify-center items-center divide-x space-x-3 text-gray-100 bg-gray-300 px-5 py-3 rounded-full">
        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-black"
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
            className="text-gray-400 border-none outline-none"
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Location"
            className="text-gray-400 border-none outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
