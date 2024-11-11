import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Users } from 'lucide-react';

export function FinanceStats() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '€45,678',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Commission Earned',
      value: '€6,851',
      change: '+15.2%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      title: 'Driver Payouts',
      value: '€38,827',
      change: '+11.8%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Average Commission',
      value: '15%',
      change: '0%',
      trend: 'neutral',
      icon: TrendingDown,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <stat.icon className="h-6 w-6 text-gray-400" />
            <span className={`text-sm font-medium ${
              stat.trend === 'up' 
                ? 'text-green-600' 
                : stat.trend === 'down' 
                ? 'text-red-600'
                : 'text-gray-600'
            }`}>
              {stat.change}
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">
            {stat.value}
          </h3>
          <p className="text-sm text-gray-500">{stat.title}</p>
        </div>
      ))}
    </div>
  );
}