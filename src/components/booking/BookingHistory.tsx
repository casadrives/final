import React from 'react';
import { Calendar, MapPin, Clock, Car, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Booking {
  id: string;
  type: 'standard' | 'airport';
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  amount: number;
  driver?: {
    name: string;
    vehicle: string;
    phone: string;
  };
  flightNumber?: string;
}

export function BookingHistory() {
  const { formatAmount } = useApp();
  const [bookings] = React.useState<Booking[]>([
    {
      id: '1',
      type: 'airport',
      date: '2024-03-20',
      time: '14:30',
      pickup: 'Luxembourg Airport (LUX)',
      dropoff: '2 Rue du Fort Thüngen, Luxembourg',
      status: 'upcoming',
      amount: 75.00,
      flightNumber: 'LH1234',
      driver: {
        name: 'John Smith',
        vehicle: 'Mercedes S-Class (LUX 1234)',
        phone: '+352 691 234 567'
      }
    },
    {
      id: '2',
      type: 'standard',
      date: '2024-03-15',
      time: '09:00',
      pickup: '4 Place Guillaume II, Luxembourg',
      dropoff: 'Luxembourg Central Station',
      status: 'completed',
      amount: 25.50
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-re d-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Booking History</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {bookings.map((booking) => (
          <div key={booking.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                {booking.type === 'airport' ? (
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Plane className="h-5 w-5 text-blue-600" />
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Car className="h-5 w-5 text-gray-600" />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-900">
                    {booking.type === 'airport' ? 'Airport Transfer' : 'Standard Ride'}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                    <Clock className="h-4 w-4 ml-3 mr-1" />
                    <span>{booking.time}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-green-500 mt-1 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Pickup</p>
                  <p className="font-medium">{booking.pickup}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-red-500 mt-1 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Dropoff</p>
                  <p className="font-medium">{booking.dropoff}</p>
                </div>
              </div>
            </div>

            {booking.flightNumber && (
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Plane className="h-4 w-4 mr-2" />
                <span>Flight: {booking.flightNumber}</span>
              </div>
            )}

            {booking.driver && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Driver Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-500">Name:</span> {booking.driver.name}</p>
                  <p><span className="text-gray-500">Vehicle:</span> {booking.driver.vehicle}</p>
                  <p><span className="text-gray-500">Phone:</span> {booking.driver.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">
                {formatAmount(booking.amount)}
              </div>
              {booking.status === 'upcoming' && (
                <div className="flex space-x-4">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Modify
                  </button>
                  <button className="text-red-600 hover:text-red-700 font-medium">
                    Cancel
                  </button>
                </div>
              )}
              {booking.status === 'completed' && (
                <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  <FileText className="h-5 w-5 mr-2" />
                  Download Receipt
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}