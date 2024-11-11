import React, { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { AdminOverview } from './AdminOverview';
import { DriversManagement } from './DriversManagement';
import { RidesManagement } from './RidesManagement';
import { Settings } from './Settings';
import { SupportDashboard } from './support/SupportDashboard';
import { FinanceDashboard } from './finance/FinanceDashboard';
import { ClientsPanel } from './ClientsPanel';
import { CompanyPanel } from './CompanyPanel';
import { DispatchConsole } from '../dispatch/DispatchConsole';
import { useAuth } from '../../context/AuthContext';

interface SuspendedCompany {
  id: string;
  name: string;
  email: string;
  paymentDue: string;
  status: string;
}

export function AdminDashboard() {
  const [currentView, setCurrentView] = useState('overview');
  const { user, logout } = useAuth();
  const [suspendedCompanies, setSuspendedCompanies] = useState<SuspendedCompany[]>([]);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <AdminOverview suspendedCompanies={suspendedCompanies} />;
      case 'clients':
        return <ClientsPanel />;
      case 'drivers':
        return <DriversManagement />;
      case 'rides':
        return <RidesManagement />;
      case 'finance':
        return <FinanceDashboard />;
      case 'companies':
        return <CompanyPanel />;
      case 'support':
        return <SupportDashboard />;
      case 'settings':
        return <Settings />;
      case 'dispatch':
        return <DispatchConsole />;
      default:
        return <AdminOverview suspendedCompanies={suspendedCompanies} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader user={user} onLogout={handleLogout} />
      <div className="flex">
        <AdminSidebar currentView={currentView} setCurrentView={setCurrentView} />
        <main className="flex-1 p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}