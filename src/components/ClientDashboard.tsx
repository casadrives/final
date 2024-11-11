import React from 'react';
import { RideHistory } from './RideHistory';
import { BookRide } from './BookRide';
import { useAuth } from '../context/AuthContext';

export function ClientDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-lg font-semibold text-blue-600">
              {user?.name.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
            <p className="text-gray-600">Ready for your next ride?</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Book a Ride</h2>
            </div>
            <div className="p-6">
              <BookRide />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Your Stats</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total Rides</p>
                <p className="text-2xl font-semibold text-gray-900">24</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">5</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Rating</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold text-gray-900">4.8</p>
                  <span className="ml-1 text-yellow-400">★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ride History */}
      <div className="mt-8">
        <RideHistory />
      </div>
    </div>
  );
}