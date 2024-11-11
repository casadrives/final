import React, { useState } from 'react';
import { X, Search } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  vehicle: string;
  status: 'available' | 'busy' | 'offline';
  rating: number;
  currentLocation?: string;
}

interface AssignDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (rideId: string, driverId: string) => void;
  ride: any;
}

export function AssignDriverModal({ isOpen, onClose, onAssign, ride }: AssignDriverModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'John Smith',
      vehicle: 'Mercedes S-Class (LUX 1234)',
      status: 'available',
      rating: 4.8,
      currentLocation: '2 Rue du Fort Thüngen'
    }
  ]);

  if (!isOpen) return null;

  const filteredDrivers = availableDrivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Assign Driver</h2>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search drivers..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredDrivers.map((driver) => (
              <div
                key={driver.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{driver.name}</h3>
                    <p className="text-sm text-gray-500">{driver.vehicle}</p>
                    {driver.currentLocation && (
                      <p className="text-sm text-gray-500 mt-1">
                        Current Location: {driver.currentLocation}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm text-gray-600">{driver.rating}</span>
                    </div>
                    <button
                      onClick={() => onAssign(ride.id, driver.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}