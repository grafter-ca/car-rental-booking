"use client";

import CarFiltersOption from "@/components/Home/CarFiltersOption";
import { CarLists } from "@/components/Home/CarLists";
import Hero from "@/components/Home/Hero";
import SearchInput from "@/components/Home/SearchInput";
import { getCarsLists } from "@/services";
import { useEffect, useState } from "react";

export default function Home() {

  const [carList, setCarList] = useState<Car[]>([])
  const [carOrgList, setCarOrgList] = useState<Car[]>([])

  useEffect(() => {
    getCarList_();
  }, [])
const getCarList_ = async () => {
  const res: any = await getCarsLists();
  setCarList(res?.carLists);
  setCarOrgList(res?.carLists);
}
const filterCarList = (brand:string) => {
  const filteredList = carOrgList.filter((car:any) => car.carBrand.toLowerCase() === brand.toLowerCase());
  setCarList(filteredList);
}
const orderedCarList = (order: any) => {
  const SortedList = [...carOrgList].sort((a, b) => 
    order === -1 ? a.price - b.price : b.price - a.price
  );
  setCarList(SortedList);
};
  return (
    <div className="p-5 sm:px-10 md:px-20">
      <Hero />
      <SearchInput />
      <CarFiltersOption 
      carsList = {carOrgList} 
      setBrand={(value:string)=> filterCarList(value)}
      orderCarList={(value:any)=> orderedCarList(value)}
      />
      <CarLists carsList = {carList} />
    </div>
  );
}
