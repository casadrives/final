import React from 'react';
import { Users, Car, MessageSquare, Activity, BarChart2, Settings, DollarSign } from 'lucide-react';

interface CompanySidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function CompanySidebar({ currentView, setCurrentView }: CompanySidebarProps) {
  const menuItems = [
    { id: 'drivers', icon: Users, label: 'Drivers' },
    { id: 'vehicles', icon: Car, label: 'Vehicles' },
    { id: 'rides', icon: Activity, label: 'Rides' },
    { id: 'finance', icon: DollarSign, label: 'Finance' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'crm', icon: BarChart2, label: 'CRM' },
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