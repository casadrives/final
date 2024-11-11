import React from 'react';
import { Star, Car } from 'lucide-react';

interface DriverInfoProps {
  driver: {
    name: string;
    photo?: string;
    rating: number;
    vehicle: {
      make: string;
      model: string;
      licensePlate: string;
      color: string;
    };
  };
}

export function DriverInfo({ driver }: DriverInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {driver.photo ? (
            <img
              src={driver.photo}
              alt={driver.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-lg font-semibold text-blue-600">
                {driver.name[0]}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {driver.name}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">{driver.rating}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center text-sm text-gray-500">
            <Car className="h-4 w-4 mr-1" />
            <span>{driver.vehicle.make} {driver.vehicle.model}</span>
          </div>
          <p className="text-sm font-medium text-gray-900">
            {driver.vehicle.licensePlate}
          </p>
          <p className="text-sm text-gray-500">{driver.vehicle.color}</p>
        </div>
      </div>
    </div>
  );
}