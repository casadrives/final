import React from 'react';
import { Clock, MapPin, User, Car } from 'lucide-react';

interface Booking {
  id: string;
  customer: {
    name: string;
    phone: string;
  };
  pickup: {
    address: string;
    time: string;
  };
  dropoff: {
    address: string;
  };
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  driver?: {
    name: string;
    vehicle: string;
  };
}

interface BookingsListProps {
  searchTerm: string;
  onSelectBooking: (id: string) => void;
}

export function BookingsList({ searchTerm, onSelectBooking }: BookingsListProps) {
  const bookings: Booking[] = [
    {
      id: '1',
      customer: {
        name: 'Sophie Martin',
        phone: '+352 691 234 567',
      },
      pickup: {
        address: '2 Rue du Fort Thüngen, Luxembourg',
        time: '2024-03-15 14:30',
      },
      dropoff: {
        address: '4 Place Guillaume II, Luxembourg',
      },
      status: 'pending',
    },
    {
      id: '2',
      customer: {
        name: 'Jean Dupont',
        phone: '+352 691 345 678',
      },
      pickup: {
        address: '12 Avenue John F. Kennedy, Luxembourg',
        time: '2024-03-15 15:00',
      },
      dropoff: {
        address: '1 Place de la Gare, Luxembourg',
      },
      status: 'assigned',
      driver: {
        name: 'John Smith',
        vehicle: 'Mercedes S-Class (LUX 1234)',
      },
    },
  ];

  const filteredBookings = bookings.filter(booking =>
    booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.pickup.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.dropoff.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="divide-y divide-gray-200">
      {filteredBookings.map((booking) => (
        <div
          key={booking.id}
          onClick={() => onSelectBooking(booking.id)}
          className="p-4 hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium">{booking.customer.name}</span>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <Clock className="h-4 w-4 text-gray-400 mt-1 mr-2" />
              <span>{new Date(booking.pickup.time).toLocaleString()}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-green-500 mt-1 mr-2" />
              <span>{booking.pickup.address}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-red-500 mt-1 mr-2" />
              <span>{booking.dropoff.address}</span>
            </div>
          </div>

          {booking.driver && (
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Car className="h-4 w-4 mr-2" />
              <span>{booking.driver.name} - {booking.driver.vehicle}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}