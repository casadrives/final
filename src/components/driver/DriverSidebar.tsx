import React from 'react';
import { Car, DollarSign, MessageSquare, Settings } from 'lucide-react';

interface DriverSidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function DriverSidebar({ currentView, setCurrentView }: DriverSidebarProps) {
  const menuItems = [
    { id: 'rides', icon: Car, label: 'Ride Requests' },
    { id: 'earnings', icon: DollarSign, label: 'Earnings' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-1">
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