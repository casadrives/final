import React from 'react';
import { HardDrive } from 'lucide-react';

export function StorageChart() {
  const storageData = [
    { type: 'Documents', size: '256.5 TB', percentage: 35 },
    { type: 'Media', size: '378.2 TB', percentage: 45 },
    { type: 'Other', size: '154.8 TB', percentage: 20 },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <HardDrive className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Storage Distribution</h2>
        </div>
        <span className="text-sm text-gray-500">789.5 TB Total</span>
      </div>

      <div className="space-y-4">
        {storageData.map((item) => (
          <div key={item.type}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-900">{item.type}</span>
              <span className="text-gray-500">{item.size}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}