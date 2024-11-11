import React from 'react';
import { HomeIcon, Car, DollarSign, UserCircle } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: HomeIcon, label: 'Dashboard' },
    { id: 'rides', icon: Car, label: 'Rides' },
    { id: 'earnings', icon: DollarSign, label: 'Earnings' },
    { id: 'profile', icon: UserCircle, label: 'Profile' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="flex items-center space-x-2 px-6 py-4">
        <Car className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-900">CasaDrive</span>
      </div>
      
      <nav className="px-4 py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              currentView === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon className={`h-5 w-5 ${
              currentView === item.id ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}