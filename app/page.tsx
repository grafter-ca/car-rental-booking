"use client";

import CarFiltersOption from "@/components/Home/CarFiltersOption";
import { CarLists } from "@/components/Home/CarLists";
import Hero from "@/components/Home/Hero";
import SearchInput from "@/components/Home/SearchInput";
import { getCarsLists } from "@/services";
import { useEffect, useState } from "react";
import{Car} from "../interfaces/index"

export default function Home() {

  const [carList, setCarList] = useState<Car[]>([])
  const [carOrgList, setCarOrgList] = useState<Car[]>([])

  useEffect(() => {
    getCarList_();
  }, [])
const getCarList_ = async () => {
  const res = await getCarsLists() as { carLists: Car[] };
  setCarList(res?.carLists);
  setCarOrgList(res?.carLists);
}
const filterCarList = (brand:string) => {
  const filteredList = carOrgList.filter((car) => car.carBrand.toLowerCase() === brand.toLowerCase());
  setCarList(filteredList);
}
const orderedCarList = (order: number) => {
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
      orderCarList={(value) => orderedCarList(Number(value))}
      />
      <CarLists carsList = {carList} />
    </div>
  );
}
