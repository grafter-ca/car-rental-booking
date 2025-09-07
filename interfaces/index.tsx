export interface Car {
  id: string;
  name: string;
  price: number;
  seat: number;
  carAvg: number;
  image: { url: string } | null;
  transmission?: 'Auto' | 'Manual';
  mpg?: number;
  manufacturer:string;
  carBrand:string
}


export interface CarCardProps {
  car: Car;
}