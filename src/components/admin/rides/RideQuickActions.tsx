import React from 'react';
import { Eye, MessageSquare, Ban, Car } from 'lucide-react';

interface RideQuickActionsProps {
  rideId: string;
  status: string;
  onView: (id: string) => void;
  onMessage: (id: string) => void;
  onAssign: (id: string) => void;
  onCancel: (id: string) => void;
}

export function RideQuickActions({ 
  rideId, 
  status, 
  onView, 
  onMessage, 
  onAssign, 
  onCancel 
}: RideQuickActionsProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onView(rideId)}
        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
        title="View Details"
      >
        <Eye className="h-5 w-5" />
      </button>
      <button
        onClick={() => onMessage(rideId)}
        className="p-1 text-gray-600 hover:bg-gray-50 rounded"
        title="Send Message"
      >
        <MessageSquare className="h-5 w-5" />
      </button>
      {status === 'pending' && (
        <button
          onClick={() => onAssign(rideId)}
          className="p-1 text-green-600 hover:bg-green-50 rounded"
          title="Assign Driver"
        >
          <Car className="h-5 w-5" />
        </button>
      )}
      {['pending', 'assigned'].includes(status) && (
        <button
          onClick={() => onCancel(rideId)}
          className="p-1 text-red-600 hover:bg-red-50 rounded"
          title="Cancel Ride"
        >
          <Ban className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}