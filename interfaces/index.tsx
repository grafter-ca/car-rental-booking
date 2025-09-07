interface Car {
  id: string;
  name: string;
  price: number;
  seat: number;
  carAvg: number;
  image: { url: string } | null;
  transmission?: 'Auto' | 'Manual';
  mpg?: number;
  manufacturer:string
}

interface CarCardProps {
  car: Car;
}