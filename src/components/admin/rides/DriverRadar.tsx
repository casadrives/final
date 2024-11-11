import React, { useState, useEffect } from 'react';
import { LocationMap } from '../../LocationMap';
import { Car, Clock, Star } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  location: [number, number];
  status: 'available' | 'busy';
  distance: number;
  rating: number;
  vehicle: {
    make: string;
    model: string;
    licensePlate: string;
    class: string;
  };
}

interface DriverRadarProps {
  pickupLocation: [number, number];
  requestedClass: string;
  onAssignDriver: (driverId: string) => void;
  onClose: () => void;
}

export function DriverRadar({ pickupLocation, requestedClass, onAssignDriver, onClose }: DriverRadarProps) {
  const [nearbyDrivers, setNearbyDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in production this would come from a real-time service
  useEffect(() => {
    const fetchNearbyDrivers = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock nearby drivers with randomized locations around pickup point
      const mockDrivers: Driver[] = Array.from({ length: 5 }, (_, i) => ({
        id: `driver-${i + 1}`,
        name: `Driver ${i + 1}`,
        location: [
          pickupLocation[0] + (Math.random() - 0.5) * 0.01,
          pickupLocation[1] + (Math.random() - 0.5) * 0.01
        ],
        status: Math.random() > 0.3 ? 'available' : 'busy',
        distance: Math.round(Math.random() * 5 * 10) / 10,
        rating: 4 + Math.random(),
        vehicle: {
          make: ['Mercedes', 'BMW', 'Audi'][Math.floor(Math.random() * 3)],
          model: ['S-Class', '7 Series', 'A8'][Math.floor(Math.random() * 3)],
          licensePlate: `LUX ${1000 + i}`,
          class: requestedClass
        }
      }));

      setNearbyDrivers(mockDrivers.sort((a, b) => a.distance - b.distance));
      setIsLoading(false);
    };

    fetchNearbyDrivers();
  }, [pickupLocation, requestedClass]);

  const handleAssign = (driver: Driver) => {
    onAssignDriver(driver.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Nearby Drivers</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ×
          </button>
        </div>

        <div className="flex-1 flex min-h-0">
          {/* Map Section */}
          <div className="w-2/3 p-4">
            <div className="h-full rounded-lg overflow-hidden">
              <LocationMap
                className="h-full w-full"
                center={pickupLocation}
                markers={[
                  { coordinates: pickupLocation, type: 'pickup' },
                  ...nearbyDrivers.map(driver => ({
                    coordinates: driver.location,
                    type: driver.status === 'available' ? 'driver' : 'driver-busy'
                  }))
                ]}
              />
            </div>
          </div>

          {/* Drivers List */}
          <div className="w-1/3 border-l border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-4">
                Available Drivers ({nearbyDrivers.filter(d => d.status === 'available').length})
              </h4>

              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {nearbyDrivers.map((driver) => (
                    <div
                      key={driver.id}
                      className={`p-4 rounded-lg border transition-colors ${
                        selectedDriver?.id === driver.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Car className={`h-5 w-5 ${
                            driver.status === 'available' 
                              ? 'text-green-500' 
                              : 'text-gray-400'
                          }`} />
                          <span className="ml-2 font-medium">{driver.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="ml-1 text-sm">{driver.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{driver.vehicle.make} {driver.vehicle.model}</p>
                        <p>{driver.vehicle.licensePlate}</p>
                        <div className="flex items-center mt-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="ml-1">{driver.distance} km away</span>
                        </div>
                      </div>

                      {driver.status === 'available' && (
                        <button
                          onClick={() => handleAssign(driver)}
                          className="mt-3 w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Assign Driver
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}