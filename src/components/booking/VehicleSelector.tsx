import React from 'react';
import { Car, Crown, Briefcase, Activity, Check } from 'lucide-react';

interface VehicleOption {
  id: 'first' | 'business' | 'economy' | 'ambulance';
  name: string;
  description: string;
  icon: React.ElementType;
  basePrice: number;
  features: string[];
  estimatedTime: number;
}

interface VehicleSelectorProps {
  selectedClass: string;
  onSelect: (vehicleClass: 'first' | 'business' | 'economy' | 'ambulance') => void;
  distance?: number;
}

export function VehicleSelector({ selectedClass, onSelect, distance = 0 }: VehicleSelectorProps) {
  const vehicleOptions: VehicleOption[] = [
    {
      id: 'first',
      name: 'First Class',
      description: 'Premium luxury experience',
      icon: Crown,
      basePrice: 3.5,
      features: [
        'Premium luxury vehicles',
        'Professional chauffeur',
        'Complimentary refreshments',
        'Priority service',
        'Extra luggage space'
      ],
      estimatedTime: 5
    },
    {
      id: 'business',
      name: 'Business Class',
      description: 'Professional comfort',
      icon: Briefcase,
      basePrice: 2.5,
      features: [
        'High-end vehicles',
        'Professional driver',
        'Business amenities',
        'Flexible booking'
      ],
      estimatedTime: 8
    },
    {
      id: 'economy',
      name: 'Economy',
      description: 'Affordable comfort',
      icon: Car,
      basePrice: 1.5,
      features: [
        'Standard vehicles',
        'Verified drivers',
        'Best value'
      ],
      estimatedTime: 12
    },
    {
      id: 'ambulance',
      name: 'Medical Transport',
      description: 'Professional medical assistance',
      icon: Activity,
      basePrice: 4.0,
      features: [
        'Medical equipment',
        'Trained medical staff',
        'Emergency response',
        'Patient monitoring',
        'Door-to-door service'
      ],
      estimatedTime: 5
    }
  ];

  const calculatePrice = (basePrice: number) => {
    return (basePrice * distance).toFixed(2);
  };

  return (
    <div className="space-y-4">
      {vehicleOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={`w-full p-4 rounded-lg border-2 transition-colors ${
            selectedClass === option.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <option.icon className={`h-8 w-8 ${
                selectedClass === option.id ? 'text-blue-600' : 'text-gray-400'
              }`} />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{option.name}</h3>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">€{calculatePrice(option.basePrice)}</p>
                  <p className="text-sm text-gray-500">{option.estimatedTime} min</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {option.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}