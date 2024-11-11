import React from 'react';
import { Bell, Settings, LogOut, Power } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DriverHeaderProps {
  user: any;
  isOnline: boolean;
  onToggleOnline: () => void;
}

export function DriverHeader({ user, isOnline, onToggleOnline }: DriverHeaderProps) {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
          <button
            onClick={onToggleOnline}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isOnline
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Power className="h-5 w-5 mr-2" />
            {isOnline ? 'Online' : 'Offline'}
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full">
            <Bell className="h-6 w-6" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full">
            <Settings className="h-6 w-6" />
          </button>
          
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || "https://via.placeholder.com/32"}
              alt={user?.name}
              className="h-8 w-8 rounded-full"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-full"
          >
            <LogOut className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}