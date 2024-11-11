import React, { useState, useEffect } from 'react';
import { MapPin, Clock, DollarSign, Check, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RideRequest {
  id: string;
  customer: {
    name: string;
    rating: number;
  };
  pickup: {
    address: string;
    coordinates: [number, number];
    distance: number;
  };
  dropoff: {
    address: string;
    coordinates: [number, number];
  };
  amount: number;
  estimatedTime: number;
  expiresIn: number;
}

interface RideRequestsProps {
  isOnline: boolean;
  onAccept: (rideId: string) => Promise<void>;
  onDecline: (rideId: string) => Promise<void>;
}

export function RideRequests({ isOnline, onAccept, onDecline }: RideRequestsProps) {
  const { formatAmount } = useApp();
  const [requests, setRequests] = useState<RideRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Demo: Add a sample request after going online
  useEffect(() => {
    if (isOnline) {
      const demoRequest: RideRequest = {
        id: '1',
        customer: {
          name: 'Sarah Johnson',
          rating: 4.8,
        },
        pickup: {
          address: '2 Rue du Fort Thüngen, Luxembourg',
          coordinates: [6.13, 49.61],
          distance: 0.5,
        },
        dropoff: {
          address: '4 Place Guillaume II, Luxembourg',
          coordinates: [6.14, 49.62],
        },
        amount: 25.50,
        estimatedTime: 15,
        expiresIn: 30,
      };
      setRequests([demoRequest]);
    } else {
      setRequests([]);
    }
  }, [isOnline]);

  const handleAccept = async (rideId: string) => {
    setIsLoading(true);
    try {
      await onAccept(rideId);
      setRequests(prev => prev.filter(req => req.id !== rideId));
    } catch (error) {
      console.error('Error accepting ride:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = async (rideId: string) => {
    setIsLoading(true);
    try {
      await onDecline(rideId);
      setRequests(prev => prev.filter(req => req.id !== rideId));
    } catch (error) {
      console.error('Error declining ride:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOnline) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">You're Currently Offline</h2>
        <p className="text-gray-600">Go online to start receiving ride requests</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Active Requests</h2>
        <p className="text-gray-600">Stay online to receive new ride requests</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Available Ride Requests</h2>
      
      <div className="grid gap-6">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg font-semibold">{request.customer.name}</span>
                  <span className="text-sm text-gray-500">
                    ({request.customer.rating} ★)
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-green-500 mt-1 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Pickup ({request.pickup.distance} km)</p>
                      <p className="font-medium">{request.pickup.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-500 mt-1 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Dropoff</p>
                      <p className="font-medium">{request.dropoff.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {formatAmount(request.amount)}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{request.estimatedTime} min</span>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-1000"
                style={{ width: `${(request.expiresIn / 30) * 100}%` }}
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button
                onClick={() => handleDecline(request.id)}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="h-5 w-5 mr-2" />
                Decline
              </button>
              <button
                onClick={() => handleAccept(request.id)}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="h-5 w-5 mr-2" />
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}