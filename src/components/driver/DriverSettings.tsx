import React from 'react';
import { User, Bell, Shield, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DriverSettingsProps {
  onRequestLeave: () => void;
}

export function DriverSettings({ onRequestLeave }: DriverSettingsProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      window.location.href = '/';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <User className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Profile Settings</h3>
          </div>
          
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50">
              Edit Profile
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50">
              Update Documents
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50">
              Change Password
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Privacy & Security</h3>
          </div>
          
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50">
              Privacy Settings
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50">
              Security Settings
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50">
              Two-Factor Authentication
            </button>
          </div>
        </div>

        {/* Leave Management */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold">Leave Management</h3>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={onRequestLeave}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Request Leave
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50">
              View Leave History
            </button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
}