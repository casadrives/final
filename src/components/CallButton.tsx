import React, { useState } from 'react';
import { Phone, PhoneCall, PhoneOff } from 'lucide-react';

interface CallButtonProps {
  type: 'client' | 'driver';
  phoneNumber?: string;
  className?: string;
}

export function CallButton({ type, phoneNumber = '+1234567890', className = '' }: CallButtonProps) {
  const [isCallActive, setIsCallActive] = useState(false);

  const handleCall = () => {
    if (isCallActive) {
      setIsCallActive(false);
    } else {
      setIsCallActive(true);
      // In a real app, this would integrate with a calling service
      window.open(`tel:${phoneNumber}`);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleCall}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          isCallActive
            ? 'bg-red-100 text-red-700 hover:bg-red-200'
            : 'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
      >
        {isCallActive ? (
          <>
            <PhoneOff className="h-5 w-5" />
            <span>End Call</span>
          </>
        ) : (
          <>
            <Phone className="h-5 w-5" />
            <span>{type === 'client' ? 'Call Driver' : 'Call Customer'}</span>
          </>
        )}
      </button>
      
      {isCallActive && (
        <div className="absolute -top-2 -right-2">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>
      )}
    </div>
  );
}