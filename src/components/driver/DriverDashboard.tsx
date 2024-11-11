import React, { useState, useEffect } from 'react';
import { DriverHeader } from './DriverHeader';
import { DriverSidebar } from './DriverSidebar';
import { RideRequests } from './RideRequests';
import { DriverEarnings } from './DriverEarnings';
import { DriverChat } from './DriverChat';
import { DriverSettings } from './DriverSettings';
import { LeaveRequestModal } from './LeaveRequestModal';
import { Navigation } from '../Navigation';
import { useAuth } from '../../context/AuthContext';

export function DriverDashboard() {
  const [currentView, setCurrentView] = useState('rides');
  const [isOnline, setIsOnline] = useState(false);
  const [showLeaveRequest, setShowLeaveRequest] = useState(false);
  const { user, logout } = useAuth();

  // Handle ride acceptance
  const handleAcceptRide = async (rideId: string) => {
    try {
      // For demo, simulate accepting ride
      console.log('Accepting ride:', rideId);
      alert('Ride accepted! Navigate to pickup location.');
    } catch (error) {
      console.error('Error accepting ride:', error);
    }
  };

  // Handle ride decline
  const handleDeclineRide = async (rideId: string) => {
    try {
      // For demo, simulate declining ride
      console.log('Declining ride:', rideId);
      alert('Ride declined.');
    } catch (error) {
      console.error('Error declining ride:', error);
    }
  };

  // Handle leave request submission
  const handleLeaveRequest = async (data: any) => {
    try {
      // For demo, simulate submitting leave request
      console.log('Submitting leave request:', data);
      alert('Leave request submitted successfully! We will review your request shortly.');
      setShowLeaveRequest(false);
    } catch (error) {
      console.error('Error submitting leave request:', error);
    }
  };

  // Handle online status toggle
  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      alert('You are now online and can receive ride requests!');
    } else {
      alert('You are now offline. You will not receive any ride requests.');
    }
  };

  // Handle back to home
  const handleBackToHome = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      window.location.href = '/';
    }
  };

  // Render appropriate view based on selection
  const renderView = () => {
    switch (currentView) {
      case 'rides':
        return (
          <RideRequests 
            isOnline={isOnline}
            onAccept={handleAcceptRide}
            onDecline={handleDeclineRide}
          />
        );
      case 'earnings':
        return <DriverEarnings />;
      case 'chat':
        return <DriverChat />;
      case 'settings':
        return <DriverSettings onRequestLeave={() => setShowLeaveRequest(true)} />;
      default:
        return <RideRequests isOnline={isOnline} onAccept={handleAcceptRide} onDecline={handleDeclineRide} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation onBackToHome={handleBackToHome} />
      
      <DriverHeader 
        user={user} 
        isOnline={isOnline} 
        onToggleOnline={handleToggleOnline}
      />
      
      <div className="flex">
        <DriverSidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
        />
        
        <main className="flex-1 p-6">
          {renderView()}
        </main>
      </div>

      <LeaveRequestModal
        isOpen={showLeaveRequest}
        onClose={() => setShowLeaveRequest(false)}
        onSubmit={handleLeaveRequest}
      />
    </div>
  );
}