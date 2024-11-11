import React, { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, User } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy';
  location: [number, number];
  rating: number;
  currentRide?: string;
}

interface AssignRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  rideId: string;
  pickup: string;
  dropoff: string;
  amount: number;
  onAssign: (rideId: string, driverId: string) => Promise<void>;
}

export function AssignRideModal({ 
  isOpen, 
  onClose, 
  rideId,
  pickup,
  dropoff,
  amount,
  onAssign 
}: AssignRideModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);

  // Mock available drivers
  const drivers: Driver[] = [
    {
      id: '1',
      name: 'John Smith',
      status: 'online',
      location: [6.13, 49.61],
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      status: 'busy',
      location: [6.14, 49.62],
      rating: 4.9,
      currentRide: 'RIDE123',
    },
  ];

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    driver.status === 'online'
  );

  const handleAssign = async () => {
    if (!selectedDriver) return;
    
    setIsAssigning(true);
    try {
      await onAssign(rideId, selectedDriver);
      onClose();
    } catch (error) {
      console.error('Error assigning ride:', error);
    } finally {
      setIsAssigning(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6">
        <h3 className="text-xl font-semibold mb-6">Assign Ride to Driver</h3>

        {/* Ride Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="font-medium">{pickup}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Dropoff</p>
                <p className="font-medium">{dropoff}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span>Immediate pickup</span>
              </div>
              <div className="font-medium text-blue-600">
                €{amount.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Driver Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search available drivers..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Driver List */}
        <div className="max-h-64 overflow-y-auto mb-6">
          {filteredDrivers.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No available drivers found</p>
          ) : (
            <div className="space-y-2">
              {filteredDrivers.map((driver) => (
                <button
                  key={driver.id}
                  onClick={() => setSelectedDriver(driver.id)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedDriver === driver.id
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'border border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{driver.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="text-yellow-400 mr-1">★</span>
                        {driver.rating}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedDriver || isAssigning}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isAssigning ? 'Assigning...' : 'Assign Ride'}
          </button>
        </div>
      </div>
    </div>
  );
}