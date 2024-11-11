import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, User, Car } from 'lucide-react';
import { AssignDriverModal } from './AssignDriverModal';

interface Ride {
  id: string;
  customer: {
    name: string;
    phone: string;
  };
  pickup: {
    address: string;
    coordinates: [number, number];
  };
  dropoff: {
    address: string;
    coordinates: [number, number];
  };
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  requestedClass: 'First Class' | 'Business Class' | 'Economy' | 'Ambulance';
  estimatedFare: number;
  assignedDriver?: {
    id: string;
    name: string;
    vehicle: string;
  };
  requestTime: string;
}

export function RidesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [rides] = useState<Ride[]>([
    {
      id: '1',
      customer: {
        name: 'Sophie Martin',
        phone: '+352 691 234 567'
      },
      pickup: {
        address: '2 Rue du Fort Thüngen, Luxembourg',
        coordinates: [49.6197, 6.1409]
      },
      dropoff: {
        address: '4 Place Guillaume II, Luxembourg',
        coordinates: [49.6117, 6.1319]
      },
      status: 'pending',
      requestedClass: 'Business Class',
      estimatedFare: 25.50,
      requestTime: '2024-03-15 14:30'
    }
  ]);

  const handleAssignDriver = (rideId: string, driverId: string) => {
    // Handle driver assignment logic
    setShowAssignModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRides = rides.filter(ride =>
    ride.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ride.pickup.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ride.dropoff.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Rides Management</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search rides..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button className="btn-secondary flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Locations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Class & Fare
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRides.map((ride) => (
                <tr key={ride.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {ride.customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {ride.customer.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-gray-600">{ride.pickup.address}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-gray-600">{ride.dropoff.address}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        ride.requestedClass === 'First Class'
                          ? 'bg-purple-100 text-purple-800'
                          : ride.requestedClass === 'Business Class'
                          ? 'bg-blue-100 text-blue-800'
                          : ride.requestedClass === 'Ambulance'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {ride.requestedClass}
                      </span>
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="font-medium">{ride.estimatedFare.toFixed(2)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ride.status)}`}>
                      {ride.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {ride.assignedDriver ? (
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">
                          {ride.assignedDriver.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {ride.assignedDriver.vehicle}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedRide(ride);
                          setShowAssignModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Assign Driver
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-500">
                        <Clock className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-500">
                        <Car className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRide && (
        <AssignDriverModal
          isOpen={showAssignModal}
          onClose={() => setShowAssignModal(false)}
          onAssign={handleAssignDriver}
          ride={selectedRide}
        />
      )}
    </div>
  );
}