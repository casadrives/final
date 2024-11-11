import React from 'react';
import { X, Clock } from 'lucide-react';

interface TrackingHeaderProps {
  estimatedTime: number;
  onClose: () => void;
}

export function TrackingHeader({ estimatedTime, onClose }: TrackingHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Clock className="h-5 w-5 text-blue-600" />
        <div>
          <p className="text-sm text-gray-500">Estimated arrival</p>
          <p className="font-semibold text-lg">{estimatedTime} min</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
}