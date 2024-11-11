import React from 'react';
import { Phone, Mail, MapPin, Star, Calendar, Clock } from 'lucide-react';

interface CustomerDetailsProps {
  customer: any;
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl font-semibold text-blue-600">
              {customer.name.charAt(0)}
            </span>
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">{customer.name}</h2>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="ml-1 text-sm text-gray-600">{customer.rating} rating</span>
            </div>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          customer.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {customer.status}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
          <div className="mt-2 space-y-3">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-900">{customer.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-900">{customer.email}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Ride Statistics</h3>
          <div className="mt-2 space-y-3">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-900">
                {customer.totalRides} total rides
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-900">
                Last ride: {customer.lastRide}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-500">Recent Locations</h3>
        <div className="mt-2 space-y-3">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="ml-2">
              <p className="text-sm text-gray-900">2 Rue du Fort Thüngen</p>
              <p className="text-xs text-gray-500">Most frequent pickup location</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
            <div className="ml-2">
              <p className="text-sm text-gray-900">4 Place Guillaume II</p>
              <p className="text-xs text-gray-500">Most frequent dropoff location</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}