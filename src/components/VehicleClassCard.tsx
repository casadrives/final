import React from 'react';
import { Car, Activity, Shield, DollarSign } from 'lucide-react';
import { VehicleClass, VEHICLE_CLASSES } from '../types/vehicle';

interface VehicleClassCardProps {
  vehicleClass: VehicleClass;
  count: number;
  onAddVehicle: (vehicleClass: VehicleClass) => void;
}

export function VehicleClassCard({ vehicleClass, count, onAddVehicle }: VehicleClassCardProps) {
  const classInfo = VEHICLE_CLASSES[vehicleClass];
  
  const getIcon = () => {
    switch (vehicleClass) {
      case 'first':
        return <Shield className="h-8 w-8 text-purple-600" />;
      case 'business':
        return <DollarSign className="h-8 w-8 text-blue-600" />;
      case 'economy':
        return <Car className="h-8 w-8 text-green-600" />;
      case 'ambulance':
        return <Activity className="h-8 w-8 text-red-600" />;
    }
  };

  const getColorClass = () => {
    switch (vehicleClass) {
      case 'first':
        return 'border-purple-200 hover:border-purple-300';
      case 'business':
        return 'border-blue-200 hover:border-blue-300';
      case 'economy':
        return 'border-green-200 hover:border-green-300';
      case 'ambulance':
        return 'border-red-200 hover:border-red-300';
    }
  };

  return (
    <div className={`bg-white rounded-lg border-2 ${getColorClass()} p-6 transition-colors`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">
          {getIcon()}
        </div>
        <span className="text-2xl font-bold">{count}</span>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{classInfo.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{classInfo.description}</p>
      
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Features:</div>
        <ul className="text-sm text-gray-600 space-y-1">
          {classInfo.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-gray-600">Base rate: </span>
          <span className="font-semibold">€{classInfo.baseRate}/km</span>
        </div>
        <button
          onClick={() => onAddVehicle(vehicleClass)}
          className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          Add Vehicle
        </button>
      </div>
    </div>
  );
}