import React, { useState } from 'react';
import { MapPin, Navigation, Clock, User, Search, Car, Calendar, Plane } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DriverTrackingModal } from './tracking/DriverTrackingModal';
import { useGeolocation } from '../hooks/useGeolocation';
import { AdvanceBooking } from './booking/AdvanceBooking';
import { AirportTransfer } from './booking/AirportTransfer';

interface Vehicle {
  make: string;
  model: string;
  licensePlate: string;
}

interface Driver {
  id: string;
  name: string;
  rating: number;
  vehicle: Vehicle;
  price: number;
  estimatedTime: number;
}

export function BookRide() {
  const [dropoff, setDropoff] = useState('');
  const [pickup, setPickup] = useState('');
  const [showDrivers, setShowDrivers] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showTracking, setShowTracking] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'pending' | 'accepted' | 'rejected' | null>(null);
  const [bookingType, setBookingType] = useState<'immediate' | 'advance' | 'airport'>('immediate');
  const { formatAmount } = useApp();
  const { location, error: locationError } = useGeolocation();

  const availableDrivers: Driver[] = [
    {
      id: '1',
      name: 'John Smith',
      rating: 4.8,
      vehicle: {
        make: 'Mercedes',
        model: 'E-Class',
        licensePlate: 'LUX 1234',
      },
      price: 25,
      estimatedTime: 5,
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      rating: 4.9,
      vehicle: {
        make: 'BMW',
        model: '5 Series',
        licensePlate: 'LUX 5678',
      },
      price: 28,
      estimatedTime: 8,
    },
    {
      id: '3',
      name: 'Michael Brown',
      rating: 4.7,
      vehicle: {
        make: 'Audi',
        model: 'A6',
        licensePlate: 'LUX 9012',
      },
      price: 22,
      estimatedTime: 10,
    },
  ];

  const handleUseCurrentLocation = async () => {
    if (location) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.longitude},${location.latitude}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
        );
        const data = await response.json();
        const address = data.features[0]?.place_name;
        if (address) {
          setPickup(address);
        }
      } catch (error) {
        console.error('Error getting address:', error);
      }
    }
  };

  const handleSearchDrivers = () => {
    if (pickup && dropoff) {
      setShowDrivers(true);
    }
  };

  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver);
  };

  const handleBooking = async () => {
    if (!selectedDriver) return;
    
    setIsBooking(true);
    setBookingStatus('pending');

    try {
      // Simulate API call to send notification to driver
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate driver response (randomly accept/reject for demo)
      const driverAccepted = Math.random() > 0.3;
      setBookingStatus(driverAccepted ? 'accepted' : 'rejected');
      
      if (driverAccepted) {
        setShowTracking(true);
      }
    } catch (error) {
      console.error('Error booking ride:', error);
      setBookingStatus('rejected');
    } finally {
      setIsBooking(false);
    }
  };

  if (bookingType === 'advance') {
    return <AdvanceBooking />;
  }

  if (bookingType === 'airport') {
    return <AirportTransfer />;
  }

  return (
    <div className="space-y-6">
      {/* Booking Type Selection */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setBookingType('immediate')}
          className={`p-4 rounded-lg border-2 transition-colors ${
            bookingType === 'immediate'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <Car className="h-6 w-6 mb-2 mx-auto text-blue-600" />
          <p className="font-medium text-gray-900">Immediate Ride</p>
          <p className="text-sm text-gray-500">Book for now</p>
        </button>
        <button
          onClick={() => setBookingType('advance')}
          className={`p-4 rounded-lg border-2 transition-colors ${
            bookingType === 'advance'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <Calendar className="h-6 w-6 mb-2 mx-auto text-blue-600" />
          <p className="font-medium text-gray-900">Advance Booking</p>
          <p className="text-sm text-gray-500">Schedule for later</p>
        </button>
        <button
          onClick={() => setBookingType('airport')}
          className={`p-4 rounded-lg border-2 transition-colors ${
            bookingType === 'airport'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <Plane className="h-6 w-6 mb-2 mx-auto text-blue-600" />
          <p className="font-medium text-gray-900">Airport Transfer</p>
          <p className="text-sm text-gray-500">To/from airport</p>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="space-y-4">
          {/* Pickup Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup location"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleUseCurrentLocation}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700"
              >
                <Navigation className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Dropoff Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dropoff Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Enter destination"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {!showDrivers && (
            <button
              onClick={handleSearchDrivers}
              disabled={!pickup || !dropoff}
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Search className="h-5 w-5 mr-2" />
              Find Drivers
            </button>
          )}

          {showDrivers && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Available Drivers</h3>
              <div className="space-y-4">
                {availableDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedDriver?.id === driver.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:border-gray-400'
                    }`}
                    onClick={() => handleSelectDriver(driver)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{driver.name}</h4>
                          <div className="text-sm text-gray-500">
                            {driver.vehicle.make} {driver.vehicle.model}
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-yellow-400">★</span>
                            <span className="ml-1 text-sm">{driver.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-blue-600">
                          {formatAmount(driver.price)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {driver.estimatedTime} min
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedDriver && (
                <button
                  onClick={handleBooking}
                  disabled={isBooking}
                  className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed mt-4 flex items-center justify-center"
                >
                  {isBooking ? (
                    'Requesting Ride...'
                  ) : (
                    `Book ${selectedDriver.name}`
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedDriver && showTracking && (
        <DriverTrackingModal
          isOpen={showTracking}
          onClose={() => setShowTracking(false)}
          driver={{
            id: selectedDriver.id,
            name: selectedDriver.name,
            phone: '+352 691 234 567',
            rating: selectedDriver.rating,
            location: [6.13, 49.61], // Demo coordinates
            vehicle: {
              make: selectedDriver.vehicle.make,
              model: selectedDriver.vehicle.model,
              licensePlate: selectedDriver.vehicle.licensePlate,
              color: 'Black'
            }
          }}
          ride={{
            pickup: {
              address: pickup,
              coordinates: [6.13, 49.61]
            },
            dropoff: {
              address: dropoff,
              coordinates: [6.14, 49.62]
            },
            estimatedTime: selectedDriver.estimatedTime,
            distance: 3.2,
            amount: selectedDriver.price
          }}
        />
      )}
    </div>
  );
}