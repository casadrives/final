import React from 'react';
import { Power } from 'lucide-react';

interface OnlineToggleProps {
  isOnline: boolean;
  onToggle: (value: boolean) => void;
}

export function OnlineToggle({ isOnline, onToggle }: OnlineToggleProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Driver Status</h2>
          <p className="text-sm text-gray-600">
            {isOnline ? 'You are online and can receive rides' : 'Go online to start receiving rides'}
          </p>
        </div>
        <button
          onClick={() => onToggle(!isOnline)}
          className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
            isOnline
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Power className="h-5 w-5 mr-2" />
          {isOnline ? 'Online' : 'Offline'}
        </button>
      </div>
    </div>
  );
}