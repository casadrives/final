export interface Ride {
  id: string;
  customer: {
    name: string;
    phone: string;
    rating?: number;
  };
  driver?: {
    id: string;
    name: string;
    photo?: string;
    rating: number;
  };
  pickup: {
    address: string;
    coordinates: [number, number];
  };
  dropoff: {
    address: string;
    coordinates: [number, number];
  };
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  amount: number;
  distance: number;
  duration: number;
  date: string;
  review?: {
    rating: number;
    comment: string;
    createdAt: string;
  };
}