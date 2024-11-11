import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, MapPin, MessageSquare, Car, User } from 'lucide-react';
import { DispatchMap } from './DispatchMap';
import { BookingsList } from './BookingsList';
import { DriversList } from './DriversList';
import { BookingModal } from './BookingModal';
import { MessageModal } from './MessageModal';

export function DispatchConsole() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [view, setView] = useState<'map' | 'list'>('map');

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Left Panel - Bookings & Drivers */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Search & Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search bookings or drivers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100">
              <Filter className="h-5 w-5" />
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setShowBookingModal(true)}
              className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700"
            >
              New Booking
            </button>
            <button
              onClick={() => setShowMessageModal(true)}
              className="flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setView('map')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              view === 'map'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              view === 'list'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            List View
          </button>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto">
          <BookingsList
            searchTerm={searchTerm}
            onSelectBooking={(id) => console.log('Selected booking:', id)}
          />
        </div>

        {/* Active Drivers */}
        <div className="h-48 border-t border-gray-200 overflow-y-auto">
          <DriversList
            searchTerm={searchTerm}
            onSelectDriver={setSelectedDriver}
            selectedDriver={selectedDriver}
          />
        </div>
      </div>

      {/* Right Panel - Map View */}
      <div className="flex-1">
        <DispatchMap
          selectedDriver={selectedDriver}
          onDriverClick={setSelectedDriver}
        />
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />

      <MessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        selectedDriver={selectedDriver}
      />
    </div>
  );
}