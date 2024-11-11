import React, { useState, useEffect } from 'react';
import { Calculator, Car, Clock, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FareEstimatorProps {
  distance: number;
  vehicleClass: 'first' | 'business' | 'economy' | 'ambulance';
  duration: number;
  onEstimateComplete?: (amount: number) => void;
}

export function FareEstimator({ distance, vehicleClass, duration, onEstimateComplete }: FareEstimatorProps) {
  const { formatAmount } = useApp();
  const [estimatedFare, setEstimatedFare] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState(true);

  const rates = {
    first: { base: 8, perKm: 3.5, perMin: 0.75, minFare: 25 },
    business: { base: 6, perKm: 2.5, perMin: 0.5, minFare: 15 },
    economy: { base: 4, perKm: 1.5, perMin: 0.35, minFare: 10 },
    ambulance: { base: 10, perKm: 4.0, perMin: 1.0, minFare: 35 }
  };

  useEffect(() => {
    const calculateFare = () => {
      setIsCalculating(true);
      const rate = rates[vehicleClass];
      
      // Base calculation
      let fare = rate.base;
      
      // Add distance cost
      fare += distance * rate.perKm;
      
      // Add time cost
      fare += (duration / 60) * rate.perMin;
      
      // Apply minimum fare if necessary
      fare = Math.max(fare, rate.minFare);
      
      // Round to 2 decimal places
      fare = Math.ceil(fare * 100) / 100;
      
      setEstimatedFare(fare);
      onEstimateComplete?.(fare);
      setIsCalculating(false);
    };

    calculateFare();
  }, [distance, vehicleClass, duration]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Calculator className="h-5 w-5 text-blue-600 mr-2" />
          Fare Estimate
        </h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          vehicleClass === 'first'
            ? 'bg-purple-100 text-purple-800'
            : vehicleClass === 'business'
            ? 'bg-blue-100 text-blue-800'
            : vehicleClass === 'ambulance'
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {vehicleClass.charAt(0).toUpperCase() + vehicleClass.slice(1)} Class
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-600">
            <Car className="h-5 w-5 mr-2" />
            <span>Distance</span>
          </div>
          <span className="font-medium">{distance.toFixed(1)} km</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>Duration</span>
          </div>
          <span className="font-medium">{duration} min</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-green-600" />
              <span className="font-semibold text-lg">Estimated Fare</span>
            </div>
            {isCalculating ? (
              <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
            ) : (
              <span className="text-2xl font-bold text-green-600">
                {formatAmount(estimatedFare)}
              </span>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          <p>* Final fare may vary based on actual route and traffic conditions</p>
          <p>* Additional charges may apply for waiting time and extra stops</p>
        </div>
      </div>
    </div>
  );
}