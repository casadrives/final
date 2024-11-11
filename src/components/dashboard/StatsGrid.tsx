import React from 'react';
import { Users, HardDrive, Share2, Shield } from 'lucide-react';

export function StatsGrid() {
  const stats = [
    {
      label: 'Total Users',
      value: '24,589',
      change: '+12%',
      icon: Users,
      color: 'blue',
    },
    {
      label: 'Storage Used',
      value: '789.5 TB',
      change: '+8%',
      icon: HardDrive,
      color: 'purple',
    },
    {
      label: 'Shared Files',
      value: '142,857',
      change: '+23%',
      icon: Share2,
      color: 'green',
    },
    {
      label: 'Security Events',
      value: '12',
      change: '-5%',
      icon: Shield,
      color: 'red',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
            <span className={`text-sm font-medium ${
              stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</h3>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}