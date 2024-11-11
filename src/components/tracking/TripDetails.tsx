import React from 'react';
import { MapPin, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TripDetailsProps {
  pickup: {
    address: string;
    coordinates: [number, number];
  };
  dropoff: {
    address: string;
    coordinates: [number, number];
  };
  distance: number;
  amount: number;
}

export function TripDetails({ pickup, dropoff, distance, amount }: TripDetailsProps) {
  const { formatAmount } = useApp();

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-green-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Pickup</p>
            <p className="font-medium">{pickup.address}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-red-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Dropoff</p>
            <p className="font-medium">{dropoff.address}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-500">Distance</p>
          <p className="font-medium">{distance} km</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Amount</p>
          <p className="font-medium text-lg">{formatAmount(amount)}</p>
        </div>
      </div>
    </div>
  );
}