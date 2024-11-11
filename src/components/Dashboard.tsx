import React from 'react';
import { Car, DollarSign, Clock, Star } from 'lucide-react';
import { LocationMap } from './LocationMap';
import { SubscriptionPlans } from './dashboard/SubscriptionPlans';

export function Dashboard() {
  const stats = [
    {
      label: "Today's Rides",
      value: '8',
      icon: Car,
      colorClass: 'text-blue-500',
    },
    {
      label: "Today's Earnings",
      value: '$145.50',
      icon: DollarSign,
      colorClass: 'text-green-500',
    },
    {
      label: 'Online Hours',
      value: '6.5h',
      icon: Clock,
      colorClass: 'text-purple-500',
    },
    {
      label: 'Rating',
      value: '4.9',
      icon: Star,
      colorClass: 'text-yellow-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <stat.icon className={stat.colorClass} />
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-gray-900">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Location</h2>
          <LocationMap className="h-[400px] w-full" />
        </div>
        <SubscriptionPlans />
      </div>
    </div>
  );
}