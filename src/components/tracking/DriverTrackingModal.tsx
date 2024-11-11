import React from 'react';
import { X, Phone, Shield, Navigation } from 'lucide-react';
import { LocationMap } from '../LocationMap';
import { DriverInfo } from './DriverInfo';
import { TrackingHeader } from './TrackingHeader';
import { SafetyTips } from './SafetyTips';
import { TripDetails } from './TripDetails';

interface DriverTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: {
    id: string;
    name: string;
    photo?: string;
    phone: string;
    vehicle: {
      make: string;
      model: string;
      licensePlate: string;
      color: string;
    };
    location: [number, number];
    rating: number;
  };
  ride: {
    pickup: {
      address: string;
      coordinates: [number, number];
    };
    dropoff: {
      address: string;
      coordinates: [number, number];
    };
    estimatedTime: number;
    distance: number;
    amount: number;
  };
}

export function DriverTrackingModal({ isOpen, onClose, driver, ride }: DriverTrackingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <TrackingHeader 
          estimatedTime={ride.estimatedTime}
          onClose={onClose}
        />

        {/* Map */}
        <div className="relative h-64 md:h-96">
          <LocationMap
            className="w-full h-full rounded-none"
            center={driver.location}
            markers={[
              { coordinates: driver.location, type: 'driver' },
              { coordinates: ride.pickup.coordinates, type: 'pickup' },
              { coordinates: ride.dropoff.coordinates, type: 'dropoff' },
            ]}
            showRoute
          />
          
          {/* Floating Driver Info Card */}
          <div className="absolute left-4 bottom-4 right-4">
            <DriverInfo driver={driver} />
          </div>
        </div>

        {/* Trip Details */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <TripDetails
            pickup={ride.pickup}
            dropoff={ride.dropoff}
            distance={ride.distance}
            amount={ride.amount}
          />
          
          <SafetyTips />
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-200 flex space-x-4">
          <button
            onClick={() => window.open(`tel:${driver.phone}`)}
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>Call Driver</span>
          </button>
          
          <button
            onClick={() => window.open(`https://maps.google.com/?q=${driver.location.join(',')}`)}
            className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Navigation className="h-5 w-5" />
            <span>Open in Maps</span>
          </button>
        </div>
      </div>
    </div>
  );
}