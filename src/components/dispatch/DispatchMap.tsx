import React from 'react';
import { LocationMap } from '../LocationMap';

interface DispatchMapProps {
  selectedDriver: string | null;
  onDriverClick: (driverId: string) => void;
}

export function DispatchMap({ selectedDriver, onDriverClick }: DispatchMapProps) {
  return (
    <div className="h-full">
      <LocationMap className="h-full" />
    </div>
  );
}