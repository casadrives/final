import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Check, X, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface RideRequest {
  id: string;
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
  customer: {
    name: string;
    rating: number;
  };
  assignedBy?: string; // Company name if assigned by company
  expiresIn?: number; // Seconds until request expires
}

interface RideNotificationsProps {
  onAccept: (rideId: string) => Promise<void>;
  onDecline: (rideId: string) => Promise<void>;
}

export function RideNotifications({ onAccept, onDecline }: RideNotificationsProps) {
  const { formatAmount } = useApp();
  const [requests, setRequests] = useState<RideRequest[]>([
    {
      id: '1',
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
      customer: {
        name: 'Sarah Johnson',
        rating: 4.8,
      },
      assignedBy: 'LuxTaxi Services', // If assigned by company
      expiresIn: 30,
    },
  ]);

  const handleAccept = async (rideId: string) => {
    try {
      await onAccept(rideId);
      setRequests(prev => prev.filter(req => req.id !== rideId));
    } catch (error) {
      console.error('Error accepting ride:', error);
    }
  };

  const handleDecline = async (rideId: string) => {
    try {
      await onDecline(rideId);
      setRequests(prev => prev.filter(req => req.id !== rideId));
    } catch (error) {
      console.error('Error declining ride:', error);
    }
  };

  if (requests.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 max-w-full space-y-4 z-50">
      {requests.map((request) => (
        <div
          key={request.id}
          className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-blue-500 animate-slide-in"
        >
          {/* Company Assignment Badge */}
          {request.assignedBy && (
            <div className="mb-2">
              <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                Assigned by {request.assignedBy}
              </span>
            </div>
          )}

          <div className="space-y-3">
            {/* Pickup */}
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Pickup ({request.pickup.distance} km)</p>
                <p className="font-medium">{request.pickup.address}</p>
              </div>
            </div>

            {/* Dropoff */}
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Dropoff</p>
                <p className="font-medium">{request.dropoff.address}</p>
              </div>
            </div>

            {/* Details */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span>{request.estimatedTime} min</span>
              </div>
              <div className="font-medium text-blue-600">
                {formatAmount(request.amount)}
              </div>
            </div>

            {/* Timer */}
            {request.expiresIn && (
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-1000"
                  style={{ width: `${(request.expiresIn / 30) * 100}%` }}
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => handleDecline(request.id)}
                className="flex-1 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
              >
                <X className="h-5 w-5 mr-2" />
                Decline
              </button>
              <button
                onClick={() => handleAccept(request.id)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center"
              >
                <Check className="h-5 w-5 mr-2" />
                Accept
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}