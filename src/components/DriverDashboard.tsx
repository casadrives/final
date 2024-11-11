import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { RideNotifications } from './driver/RideNotifications';
import { OnlineToggle } from './OnlineToggle';
import { CurrentRide } from './CurrentRide';
import { LeaveRequestModal } from './driver/LeaveRequestModal';
import { Clock, DollarSign, MapPin, AlertCircle } from 'lucide-react';

export function DriverDashboard() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [currentRide, setCurrentRide] = useState(null);
  const [showLeaveRequest, setShowLeaveRequest] = useState(false);
  const [earnings, setEarnings] = useState({
    today: 0,
    week: 0,
    month: 0
  });

  // Handle ride acceptance
  const handleAcceptRide = async (rideId: string) => {
    try {
      // In production, make API call to accept ride
      console.log('Accepting ride:', rideId);
      
      // Mock current ride data
      setCurrentRide({
        id: rideId,
        customer: {
          name: 'Sarah Johnson',
          phone: '+352 691 234 567',
          rating: 4.8
        },
        pickup: {
          address: '2 Rue du Fort Thüngen, Luxembourg',
          coordinates: [6.13, 49.61]
        },
        dropoff: {
          address: '4 Place Guillaume II, Luxembourg',
          coordinates: [6.14, 49.62]
        },
        amount: 25.50,
        distance: 3.2,
        duration: 15
      });
    } catch (error) {
      console.error('Error accepting ride:', error);
    }
  };

  // Handle ride decline
  const handleDeclineRide = async (rideId: string) => {
    try {
      // In production, make API call to decline ride
      console.log('Declining ride:', rideId);
    } catch (error) {
      console.error('Error declining ride:', error);
    }
  };

  // Handle leave request submission
  const handleLeaveRequest = async (data: any) => {
    try {
      // In production, make API call to submit leave request
      console.log('Submitting leave request:', data);
      setShowLeaveRequest(false);
    } catch (error) {
      console.error('Error submitting leave request:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Driver Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-lg font-semibold text-blue-600">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600">Driver Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setShowLeaveRequest(true)}
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Request Leave
          </button>
        </div>
      </div>

      {/* Online Toggle */}
      <OnlineToggle
        isOnline={isOnline}
        onToggle={setIsOnline}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <DollarSign className="h-6 w-6 text-green-500" />
            <span className="text-sm text-green-600">+15%</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">
            €{earnings.today.toFixed(2)}
          </h3>
          <p className="text-sm text-gray-500">Today's Earnings</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <Clock className="h-6 w-6 text-blue-500" />
            <span className="text-sm text-blue-600">Online</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">6.5h</h3>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <MapPin className="h-6 w-6 text-purple-500" />
            <span className="text-sm text-purple-600">8 rides</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">32km</h3>
          <p className="text-sm text-gray-500">Total Distance</p>
        </div>
      </div>

      {/* Current Ride or Ride Notifications */}
      {currentRide ? (
        <div className="mt-8">
          <CurrentRide ride={currentRide} />
        </div>
      ) : isOnline && (
        <RideNotifications
          onAccept={handleAcceptRide}
          onDecline={handleDeclineRide}
        />
      )}

      {/* Leave Request Modal */}
      <LeaveRequestModal
        isOpen={showLeaveRequest}
        onClose={() => setShowLeaveRequest(false)}
        onSubmit={handleLeaveRequest}
      />
    </div>
  );
}