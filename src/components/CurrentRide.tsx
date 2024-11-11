import React, { useState } from 'react';
import { MapPin, Navigation, Phone, User, Clock } from 'lucide-react';
import { CallButton } from './CallButton';
import { RideReview } from './RideReview';
import type { Ride } from '../types/ride';
import { useApp } from '../context/AppContext';

interface CurrentRideProps {
  ride: Ride;
}

export function CurrentRide({ ride }: CurrentRideProps) {
  const { formatAmount } = useApp();
  const [showReview, setShowReview] = useState(false);
  
  const handleReviewSubmit = async (review: { rating: number; comment: string; rideId: string }) => {
    // In production, make API call to submit review
    console.log('Submitting review:', review);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Current Ride</h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            In Progress
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">{ride.customer.name}</p>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-600">{ride.customer.phone}</p>
                </div>
              </div>
            </div>
            <CallButton type="driver" phoneNumber={ride.customer.phone} />
          </div>

          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Pickup</p>
                <p className="font-medium">{ride.pickup.address}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-red-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Dropoff</p>
                <p className="font-medium">{ride.dropoff.address}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div>
              <p className="text-sm text-gray-500">Distance</p>
              <p className="font-medium">{ride.distance} km</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{ride.duration} min</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="font-medium">{formatAmount(ride.amount)}</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Navigation className="h-5 w-5 mr-2" />
              Navigate
            </button>
            <button 
              onClick={() => setShowReview(true)}
              className="flex-1 bg-gray-100 text-gray-700 rounded-lg px-4 py-2 font-medium hover:bg-gray-200 transition-colors"
            >
              Rate Ride
            </button>
          </div>
        </div>
      </div>

      {showReview && (
        <RideReview
          rideId={ride.id}
          driverName={ride.driver?.name || 'Your Driver'}
          driverPhoto={ride.driver?.photo}
          onSubmit={handleReviewSubmit}
          onClose={() => setShowReview(false)}
        />
      )}
    </>
  );
}