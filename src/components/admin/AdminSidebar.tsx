import React from 'react';
import { LayoutDashboard, Users, Car, Settings, HeartHandshake, MessageSquare, DollarSign, Building, Send } from 'lucide-react';

interface AdminSidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function AdminSidebar({ currentView, setCurrentView }: AdminSidebarProps) {
  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'dispatch', icon: Send, label: 'Dispatch Console' },
    { id: 'clients', icon: Users, label: 'Clients' },
    { id: 'drivers', icon: Car, label: 'Drivers' },
    { id: 'companies', icon: Building, label: 'Companies' },
    { id: 'rides', icon: HeartHandshake, label: 'Rides' },
    { id: 'finance', icon: DollarSign, label: 'Finance' },
    { id: 'support', icon: MessageSquare, label: 'Support' },
    { id: 'settings', icon: Settings, label: 'Settings' }
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