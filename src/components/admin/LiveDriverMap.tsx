import React, { useEffect, useState } from 'react';
import { LocationMap } from '../LocationMap';
import { User, MapPin } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  location: [number, number];
  status: 'online' | 'offline';
  currentRide?: {
    pickup: [number, number];
    dropoff: [number, number];
  };
}

interface LiveDriverMapProps {
  className?: string;
  drivers: Driver[];
  onDriverClick?: (driver: Driver) => void;
}

export function LiveDriverMap({ className = '', drivers, onDriverClick }: LiveDriverMapProps) {
  const [markers, setMarkers] = useState<any[]>([]);

  // Update markers when drivers change
  useEffect(() => {
    const newMarkers = drivers.flatMap(driver => {
      const markers = [{
        coordinates: driver.location,
        type: driver.status === 'online' ? 'driver-online' : 'driver-offline',
        data: driver
      }];

      // Add ride markers if driver is on a ride
      if (driver.currentRide) {
        markers.push(
          {
            coordinates: driver.currentRide.pickup,
            type: 'pickup',
            data: { driverId: driver.id }
          },
          {
            coordinates: driver.currentRide.dropoff,
            type: 'dropoff',
            data: { driverId: driver.id }
          }
        );
      }

      return markers;
    });

    setMarkers(newMarkers);
  }, [drivers]);

  return (
    <div className={`${className} relative`}>
      <LocationMap
        className="h-full"
        markers={markers}
      />
      
      {/* Driver List Overlay */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-h-[calc(100%-2rem)] overflow-y-auto">
        <h3 className="font-semibold mb-4">Active Drivers</h3>
        <div className="space-y-2">
          {drivers.map(driver => (
            <button
              key={driver.id}
              onClick={() => onDriverClick?.(driver)}
              className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 w-full text-left ${
                driver.status === 'online' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <User className="h-5 w-5" />
              <div>
                <div className="font-medium">{driver.name}</div>
                <div className="text-xs text-gray-500">
                  {driver.status === 'online' ? 'Online' : 'Offline'}
                </div>
              </div>
              {driver.currentRide && (
                <MapPin className="h-4 w-4 ml-auto" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}