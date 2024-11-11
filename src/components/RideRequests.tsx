import React from 'react';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface RideRequestsProps {
  isOnline: boolean;
  onAcceptRide: (ride: any) => void;
}

export function RideRequests({ isOnline, onAcceptRide }: RideRequestsProps) {
  const { formatAmount } = useApp();
  const demoRequests = [
    {
      id: '1',
      customer: {
        name: 'Sarah Johnson',
        rating: 4.8,
      },
      pickup: {
        address: '2 Rue du Fort Thüngen, Luxembourg',
        distance: '0.5',
      },
      dropoff: {
        address: '4 Place Guillaume II, Luxembourg',
      },
      amount: 18.50,
      estimatedTime: '15',
    },
  ];

  if (!isOnline) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-600">Go online to start receiving ride requests</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Nearby Requests</h2>
      <div className="space-y-4">
        {demoRequests.map((request) => (
          <div
            key={request.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium">{request.customer.name}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{request.estimatedTime} min away</span>
                </div>
              </div>
              <div className="flex items-center text-lg font-semibold text-green-600">
                {formatAmount(request.amount)}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Pickup ({request.pickup.distance} km)</p>
                  <p className="text-sm font-medium">{request.pickup.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Dropoff</p>
                  <p className="text-sm font-medium">{request.dropoff.address}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onAcceptRide(request)}
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition-colors"
            >
              Accept Ride
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}