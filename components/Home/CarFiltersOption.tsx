import { Car } from "@/interfaces";
import React, { useEffect, useState } from "react";

interface CarFiltersOptionProps {
  carsList: Car[];
  setBrand: (brand: string) => void;
  orderCarList: (order: string | number) => void;
}

const CarFiltersOption: React.FC<CarFiltersOptionProps> = ({ carsList, setBrand, orderCarList }) => {
  const [BrandList, setBrandList] = useState<string[]>([]);

  useEffect(() => {
    if (carsList && carsList.length > 0) {
      const Brandset = new Set<string>();
      carsList.forEach((element: Car) => {
        Brandset.add(element.manufacturer);
      });
      setBrandList(Array.from(Brandset));
    }
  }, [carsList]); // ✅ no missing dependency warning now

  return (
    <div className="space-y-4 flex items-center justify-between">
      <div>
        <h2 className="text-[30px] font-bold">Cars Catalog</h2>
        <h2>Explore our cars you might like</h2>
      </div>

      <div className="flex gap-3">
        {/* Order by Price */}
        <div className="border border-gray-300 shadow p-1 px-2 rounded">
          <select
            name="price"
            id="price"
            className="select space-x-1"
            defaultValue=""
            onChange={(e) => orderCarList(e.target.value)}
          >
            <option value="" disabled>
              Price
            </option>
            <option value={-1}>Min to Max</option>
            <option value={1}>Max to Min</option>
          </select>
        </div>

        {/* Filter by Manufacturer */}
        <div className="hidden lg:flex border border-gray-300 shadow p-1 px-2 rounded">
          <select
            name="manufacturer"
            id="manufacturer"
            className="select space-x-1"
            defaultValue=""
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="" disabled>
              Manufacturer
            </option>
            {BrandList.map((brand: string, index: number) => (
              <option key={index} value={brand}>
                {brand.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CarFiltersOption;
