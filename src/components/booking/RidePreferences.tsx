import React from 'react';
import { Briefcase, Baby, Dog, Wheelchair, Music, Snowflake, Utensils } from 'lucide-react';

interface RidePreference {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

interface RidePreferencesProps {
  selectedPreferences: string[];
  onTogglePreference: (preference: string) => void;
}

export function RidePreferences({ selectedPreferences, onTogglePreference }: RidePreferencesProps) {
  const preferences: RidePreference[] = [
    {
      id: 'luggage',
      name: 'Extra Luggage',
      icon: Briefcase,
      description: 'Large trunk space needed'
    },
    {
      id: 'baby',
      name: 'Baby Seat',
      icon: Baby,
      description: 'Child safety seat required'
    },
    {
      id: 'pet',
      name: 'Pet Friendly',
      icon: Dog,
      description: 'Traveling with a pet'
    },
    {
      id: 'wheelchair',
      name: 'Wheelchair Access',
      icon: Wheelchair,
      description: 'Accessible vehicle needed'
    },
    {
      id: 'quiet',
      name: 'Quiet Ride',
      icon: Music,
      description: 'Prefer minimal conversation'
    },
    {
      id: 'temperature',
      name: 'Temperature',
      icon: Snowflake,
      description: 'Specific temperature needs'
    },
    {
      id: 'food',
      name: 'Food Allowed',
      icon: Utensils,
      description: 'Planning to eat in car'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Ride Preferences</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {preferences.map((pref) => (
          <button
            key={pref.id}
            onClick={() => onTogglePreference(pref.id)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedPreferences.includes(pref.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <pref.icon className={`h-6 w-6 ${
                selectedPreferences.includes(pref.id) ? 'text-blue-600' : 'text-gray-400'
              }`} />
              <p className="font-medium">{pref.name}</p>
              <p className="text-xs text-gray-500">{pref.description}</p>
            </div>
          </button>
        ))}
      </div>
      
      {selectedPreferences.length > 0 && (
        <p className="text-sm text-gray-500 mt-4">
          * Additional charges may apply for some preferences
        </p>
      )}
    </div>
  );
}