import React from 'react';
import { MapPin, Clock, DollarSign, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function RideHistory() {
  const { formatAmount } = useApp();
  
  const rides = [
    {
      id: 1,
      date: '2024-03-15',
      pickup: '123 Main St',
      dropoff: '456 Park Ave',
      amount: 25.50,
      status: 'completed',
      driver: 'John D.',
      rating: 5,
      duration: '15 min',
    },
    {
      id: 2,
      date: '2024-03-14',
      pickup: '789 Broadway',
      dropoff: '321 Fifth Ave',
      amount: 32.75,
      status: 'completed',
      driver: 'Sarah M.',
      rating: 4,
      duration: '22 min',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Recent Rides</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {rides.map((ride) => (
          <div key={ride.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">{new Date(ride.date).toLocaleDateString()}</p>
                <p className="font-medium">Driver: {ride.driver}</p>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <span className="font-semibold">{formatAmount(ride.amount)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Pickup</p>
                  <p className="font-medium">{ride.pickup}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Dropoff</p>
                  <p className="font-medium">{ride.dropoff}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{ride.duration}</span>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < ride.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}