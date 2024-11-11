import React from 'react';
import { Car } from '../types/car';
import { AlertCircle } from 'lucide-react';

interface EarningsViewProps {
  cars?: Car[];
  startDate?: Date;
  endDate?: Date;
}

export function EarningsView({ cars = [], startDate, endDate }: EarningsViewProps) {
  if (!cars.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <AlertCircle className="w-5 h-5" />
          <p>No vehicles available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Fleet Earnings Overview</h2>
      <div className="space-y-4">
        {cars.map((car) => (
          <div 
            key={car.id} 
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  {car.make} {car.model} ({car.year})
                </h3>
                <p className="text-gray-600">License: {car.licensePlate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Driver</p>
                <p className="font-medium">
                  {car.driver?.name || 'Unassigned'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EarningsView;