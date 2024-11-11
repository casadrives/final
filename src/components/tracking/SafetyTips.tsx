import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';

export function SafetyTips() {
  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Shield className="h-5 w-5 text-blue-600" />
        <h3 className="font-medium text-blue-900">Safety Tips</h3>
      </div>
      <ul className="space-y-2 text-sm text-blue-800">
        <li className="flex items-start space-x-2">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>Verify driver's identity and vehicle details</span>
        </li>
        <li className="flex items-start space-x-2">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>Share your trip status with trusted contacts</span>
        </li>
        <li className="flex items-start space-x-2">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>Keep valuables close and be aware of surroundings</span>
        </li>
      </ul>
    </div>
  );
}