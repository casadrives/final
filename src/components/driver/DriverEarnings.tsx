import React from 'react';
import { Calendar, DollarSign, TrendingUp, Clock } from 'lucide-react';

export function DriverEarnings() {
  const earnings = {
    today: '€145.50',
    week: '€875.25',
    month: '€3,450.00',
    rides: 145,
    hours: 32,
    rating: 4.8,
  };

  const recentRides = [
    {
      id: '1',
      date: '2024-03-15',
      pickup: '2 Rue du Fort Thüngen',
      dropoff: '4 Place Guillaume II',
      amount: '€25.00',
      class: 'First Class',
    },
    // Add more mock rides as needed
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">Today's Earnings</span>
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-bold">{earnings.today}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">This Week</span>
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold">{earnings.week}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">Hours Online</span>
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold">{earnings.hours}h</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Rides</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentRides.map((ride) => (
            <div key={ride.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {ride.class}
                  </span>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500">{ride.date}</p>
                    <p className="font-medium">{ride.pickup} → {ride.dropoff}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{ride.amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}