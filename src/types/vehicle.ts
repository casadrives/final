export type VehicleClass = 'first' | 'business' | 'economy' | 'ambulance';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  vehicleClass: VehicleClass;
  baseRate: number;
  status: 'available' | 'assigned' | 'maintenance';
  assignedDriver?: string;
  features: string[];
  capacity: number;
  medicalEquipment?: string[]; // For ambulance vehicles
}

export const VEHICLE_CLASSES = {
  first: {
    name: 'First Class',
    description: 'Premium luxury vehicles with top-tier amenities',
    baseRate: 3.5, // Per km
    features: [
      'Premium leather seats',
      'Privacy partition',
      'Champagne service',
      'WiFi & entertainment',
      'Professional chauffeur'
    ]
  },
  business: {
    name: 'Business Class',
    description: 'Comfortable and professional transportation',
    baseRate: 2.5, // Per km
    features: [
      'Leather seats',
      'WiFi',
      'Water bottles',
      'Professional driver'
    ]
  },
  economy: {
    name: 'Economy Class',
    description: 'Affordable and reliable transportation',
    baseRate: 1.5, // Per km
    features: [
      'Air conditioning',
      'Clean and comfortable',
      'Professional driver'
    ]
  },
  ambulance: {
    name: 'Medical Transport',
    description: 'Professional medical transportation service',
    baseRate: 4.0, // Per km
    features: [
      'Medical equipment',
      'Trained medical staff',
      'Emergency response',
      'Patient monitoring'
    ],
    requiredEquipment: [
      'Stretcher',
      'First aid kit',
      'Oxygen supply',
      'Defibrillator',
      'Medical monitoring devices'
    ]
  }
};