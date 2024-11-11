export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: 'active' | 'maintenance' | 'inactive';
  driver?: {
    id: string;
    name: string;
  };
}