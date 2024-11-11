import React, { useState } from 'react';
import { Calendar, User, Car, MapPin, DollarSign } from 'lucide-react';
import { RideQuickActions } from './RideQuickActions';
import { DriverRadar } from './DriverRadar';
import type { Ride } from '../../../types/ride';

interface RidesListProps {
  rides: Ride[];
  onViewRide: (id: string) => void;
  onMessageRide: (id: string) => void;
  onAssignRide: (id: string) => void;
  onCancelRide: (id: string) => void;
}

export function RidesList({ 
  rides, 
  onViewRide, 
  onMessageRide, 
  onAssignRide, 
  onCancelRide 
}: RidesListProps) {
  const [showRadar, setShowRadar] = useState(false);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);

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

  const handleAssignClick = (ride: Ride) => {
    setSelectedRide(ride);
    setShowRadar(true);
  };

  const handleAssignDriver = (driverId: string) => {
    if (selectedRide) {
      onAssignRide(selectedRide.id);
    }
    setShowRadar(false);
    setSelectedRide(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Driver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Class
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rides.map((ride) => (
              <tr key={ride.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{ride.date}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {ride.customer.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {ride.customer.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {ride.driver ? (
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {ride.driver.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {ride.driver.vehicle}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Unassigned</span>
                  )}
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
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ride.status)}`}>
                    {ride.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm font-medium text-gray-900">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                    €{ride.amount.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RideQuickActions
                    rideId={ride.id}
                    status={ride.status}
                    onView={() => onViewRide(ride.id)}
                    onMessage={() => onMessageRide(ride.id)}
                    onAssign={() => handleAssignClick(ride)}
                    onCancel={() => onCancelRide(ride.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showRadar && selectedRide && (
        <DriverRadar
          pickupLocation={selectedRide.pickup.coordinates}
          requestedClass={selectedRide.requestedClass}
          onAssignDriver={handleAssignDriver}
          onClose={() => setShowRadar(false)}
        />
      )}
    </>
  );
}