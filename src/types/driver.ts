export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  rating: number;
  totalRides: number;
  totalEarnings: number;
  status: 'online' | 'offline' | 'busy';
  vehicle?: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
  };
}