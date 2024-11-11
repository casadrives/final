import React from 'react';
import { Bell, Settings, Car } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface CompanyHeaderProps {
  user: any;
}

export function CompanyHeader({ user }: CompanyHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Car className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900 ml-2">Company Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full">
            <Bell className="h-6 w-6" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full">
            <Settings className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {user?.name?.[0] || 'C'}
              </span>
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user?.name || 'Company Name'}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}