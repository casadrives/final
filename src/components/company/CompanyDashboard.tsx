import React, { useState } from 'react';
import { CompanyHeader } from './CompanyHeader';
import { CompanySidebar } from './CompanySidebar';
import { DriversManagement } from './DriversManagement';
import { VehicleManagement } from './VehicleManagement';
import { RidesManagement } from './RidesManagement';
import { CompanyChat } from './CompanyChat';
import { CompanyCRM } from './CompanyCRM';
import { CompanyFinance } from './CompanyFinance';
import { useAuth } from '../../context/AuthContext';
import { Navigation } from '../Navigation';

export function CompanyDashboard() {
  const [currentView, setCurrentView] = useState('drivers');
  const { user, logout } = useAuth();

  const handleBackToHome = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      window.location.href = '/';
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'drivers':
        return <DriversManagement />;
      case 'vehicles':
        return <VehicleManagement />;
      case 'rides':
        return <RidesManagement />;
      case 'chat':
        return <CompanyChat />;
      case 'crm':
        return <CompanyCRM />;
      case 'finance':
        return <CompanyFinance />;
      default:
        return <DriversManagement />;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation onBackToHome={handleBackToHome} />
      <CompanyHeader user={user} />
      <div className="flex">
        <CompanySidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}