import React, { useEffect, useState } from "react";

const CarFiltersOption = ({ carsList, setBrand, orderCarList }: any) => {
  const [BrandList, setBrandList] = useState<any>([]);
  useEffect(() => {
    if (carsList) {
      filterCarList();
    }
  }, [carsList]);

  const Brandset = new Set();
  const filterCarList = () => {
    carsList.forEach((elememt: any) => {
      Brandset.add(elememt.carBrand);
    });
    setBrandList(Array.from(Brandset));
  };
  return (
    <div className="space-y-4 flex items-center justify-between">
      <div>
        <h2 className="text-[30px] font-bold">Cars Catalog</h2>
        <h2>Explore our cars you might likes</h2>
      </div>

      <div className="flex gap-3">
        <div className="border border-gray-300 shadow p-1 px-2 rounded">
          <select
            name="price"
            id="price"
            className="select  space-x-1"
            onChange={(e) => orderCarList(e.target.value)}
          >
            <option disabled selected>
              Price
            </option>
            <option value={-1}>Min to Max</option>
            <option value={1}>Max to Min</option>
          </select>
        </div>
        <div className="hidden lg:flex border border-gray-300 shadow p-1 px-2 rounded">
          <select
            name="manufacturer"
            id="manufacturer"
            className="select  space-x-1"
            onChange={(e) => setBrand(e.target.value)}
          >
            <option disabled selected>
              Manufacturer
            </option>
            {BrandList &&
              BrandList.map((brand: string, index: number) => (
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
