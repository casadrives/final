import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

interface BookingSlot {
  id: string;
  date: string;
  time: string;
  type: 'airport' | 'standard';
  available: boolean;
  price: number;
}

interface BookingCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  availableSlots: BookingSlot[];
}

export function BookingCalendar({ selectedDate, onSelectDate, availableSlots }: BookingCalendarProps) {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const getDayClass = (date: Date) => {
    const slots = availableSlots.filter(
      slot => new Date(slot.date).toDateString() === date.toDateString()
    );

    if (date < today) return 'text-gray-300 cursor-not-allowed';
    if (slots.length === 0) return 'text-gray-400 cursor-not-allowed';
    if (slots.some(slot => slot.available)) return 'text-blue-600 hover:bg-blue-50 cursor-pointer';
    return 'text-red-400 cursor-not-allowed';
  };

  const renderCalendarDays = () => {
    const days = [];
    const currentDate = new Date(today);

    while (currentDate <= maxDate) {
      days.push(
        <button
          key={currentDate.toISOString()}
          onClick={() => {
            const slots = availableSlots.filter(
              slot => new Date(slot.date).toDateString() === currentDate.toDateString()
            );
            if (slots.some(slot => slot.available)) {
              onSelectDate(new Date(currentDate));
            }
          }}
          className={`p-2 text-center rounded-lg ${getDayClass(currentDate)} ${
            selectedDate?.toDateString() === currentDate.toDateString()
              ? 'bg-blue-100'
              : ''
          }`}
          disabled={
            currentDate < today ||
            !availableSlots.some(
              slot =>
                new Date(slot.date).toDateString() === currentDate.toDateString() &&
                slot.available
            )
          }
        >
          <span className="block text-sm">
            {currentDate.toLocaleDateString('default', { weekday: 'short' })}
          </span>
          <span className="block text-lg font-semibold">
            {currentDate.getDate()}
          </span>
        </button>
      );

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold">Select Date</h3>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
            <span>Fully Booked</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {renderCalendarDays()}
      </div>

      {selectedDate && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Available Time Slots
          </h4>
          <div className="grid grid-cols-4 gap-2">
            {availableSlots
              .filter(
                slot =>
                  new Date(slot.date).toDateString() === selectedDate.toDateString()
              )
              .map(slot => (
                <button
                  key={slot.id}
                  disabled={!slot.available}
                  className={`p-2 rounded-lg text-center ${
                    slot.available
                      ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Clock className="h-4 w-4 mx-auto mb-1" />
                  <span className="text-sm">{slot.time}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Booking Guidelines</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Book up to one year in advance</li>
              <li>Free cancellation up to 24 hours before pickup</li>
              <li>Flight tracking for airport transfers</li>
              <li>Special requests available for all bookings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}