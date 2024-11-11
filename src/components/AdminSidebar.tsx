import React from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  LayoutDashboard,
  Users,
  HardDrive,
  Shield,
  Settings,
  Activity,
  FileText,
} from 'lucide-react';

export function AdminSidebar() {
  const { currentView, setCurrentView } = useAdmin();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'User Management' },
    { id: 'storage', icon: HardDrive, label: 'Storage' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'logs', icon: Activity, label: 'System Logs' },
    { id: 'reports', icon: FileText, label: 'Reports' },
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
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}