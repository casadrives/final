import React, { useEffect, useState } from 'react';
import { Phone, Navigation, Clock, Shield } from 'lucide-react';
import { LocationMap } from './LocationMap';
import { CallButton } from './CallButton';

interface Driver {
  id: string;
  name: string;
  vehicle: {
    make: string;
    model: string;
    licensePlate: string;
  };
  location: [number, number];
  estimatedArrival: number;
}

interface DriverTrackingProps {
  driver: Driver;
  pickup: [number, number];
  dropoff: [number, number];
  onCancel?: () => void;
}

export function DriverTracking({ driver, pickup, dropoff, onCancel }: DriverTrackingProps) {
  const [driverLocation, setDriverLocation] = useState<[number, number]>(driver.location);
  const [remainingTime, setRemainingTime] = useState(driver.estimatedArrival);

  // Simulate driver movement
  useEffect(() => {
    const interval = setInterval(() => {
      // In production, this would fetch real-time driver location
      setDriverLocation(prev => {
        const [lng, lat] = prev;
        return [
          lng + (Math.random() - 0.5) * 0.001,
          lat + (Math.random() - 0.5) * 0.001
        ];
      });

      setRemainingTime(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Driver En Route</h2>
          <CallButton type="client" phoneNumber="+1234567890" />
        </div>
      </div>

      <div className="p-6">
        {/* Driver Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-lg font-semibold text-blue-600">
                {driver.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-medium">{driver.name}</h3>
              <p className="text-sm text-gray-500">
                {driver.vehicle.make} {driver.vehicle.model} • {driver.vehicle.licensePlate}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-semibold text-blue-600">
              {remainingTime} min
            </div>
            <p className="text-sm text-gray-500">estimated arrival</p>
          </div>
        </div>

        {/* Map */}
        <div className="h-[400px] mb-6">
          <LocationMap
            className="h-full"
            center={driverLocation}
            markers={[
              { coordinates: driverLocation, type: 'pickup' },
              { coordinates: pickup, type: 'pickup' },
              { coordinates: dropoff, type: 'dropoff' },
            ]}
          />
        </div>

        {/* Safety Tips */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium text-blue-900">Safety Tips</h4>
          </div>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Verify driver's identity and vehicle details</li>
            <li>• Share your trip status with trusted contacts</li>
            <li>• Keep valuables close and be aware of surroundings</li>
          </ul>
        </div>

        {/* Cancel Button */}
        {onCancel && (
          <button
            onClick={onCancel}
            className="w-full mt-4 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Cancel Ride
          </button>
        )}
      </div>
    </div>
  );
}