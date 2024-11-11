import React from 'react';
import { Calendar } from 'lucide-react';

export function RevenueChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const revenue = [32000, 28000, 45000, 38000, 42000, 48000];
  const commission = revenue.map(amount => amount * 0.15);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Revenue & Commission Trends</h3>
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
            <option>Last 6 months</option>
            <option>Last year</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      <div className="h-80">
        <div className="h-full flex items-end space-x-2">
          {months.map((month, index) => (
            <div key={month} className="flex-1 flex flex-col items-stretch space-y-1">
              <div className="flex-1 flex flex-col justify-end space-y-1">
                {/* Commission Bar */}
                <div 
                  className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${(commission[index] / Math.max(...revenue)) * 100}%` }}
                >
                  <div className="invisible group-hover:visible text-xs text-white text-center">
                    €{commission[index].toFixed(0)}
                  </div>
                </div>
                {/* Revenue Bar */}
                <div 
                  className="w-full bg-blue-200 rounded-t transition-all duration-300 hover:bg-blue-300"
                  style={{ height: `${(revenue[index] / Math.max(...revenue)) * 100}%` }}
                >
                  <div className="invisible group-hover:visible text-xs text-blue-800 text-center">
                    €{revenue[index].toFixed(0)}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-600">{month}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-200 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Total Revenue</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600">Commission</span>
        </div>
      </div>
    </div>
  );
}