import React from 'react';
import { Car, MapPin } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  vehicle: string;
  status: 'online' | 'busy' | 'offline';
  location: string;
  lastUpdate: string;
}

interface DriversListProps {
  searchTerm: string;
  selectedDriver: string | null;
  onSelectDriver: (id: string | null) => void;
}

export function DriversList({ searchTerm, selectedDriver, onSelectDriver }: DriversListProps) {
  const drivers: Driver[] = [
    {
      id: '1',
      name: 'John Smith',
      vehicle: 'Mercedes S-Class (LUX 1234)',
      status: 'online',
      location: 'Place d\'Armes, Luxembourg',
      lastUpdate: '2 min ago',
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      vehicle: 'BMW 7 Series (LUX 5678)',
      status: 'busy',
      location: 'Luxembourg Airport',
      lastUpdate: '5 min ago',
    },
  ];

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="px-4 py-2 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">Active Drivers</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredDrivers.map((driver) => (
          <div
            key={driver.id}
            onClick={() => onSelectDriver(driver.id === selectedDriver ? null : driver.id)}
            className={`p-4 hover:bg-gray-50 cursor-pointer ${
              selectedDriver === driver.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Car className="h-5 w-5 text-gray-400 mr-2" />
                <span className="font-medium">{driver.name}</span>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                driver.status === 'online'
                  ? 'bg-green-100 text-green-800'
                  : driver.status === 'busy'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {driver.status}
              </span>
            </div>
            <div className="text-sm text-gray-500">{driver.vehicle}</div>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{driver.location}</span>
              <span className="mx-1">•</span>
              <span>{driver.lastUpdate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}