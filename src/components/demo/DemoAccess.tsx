import React from 'react';
import { Car, Building, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function DemoAccess() {
  const { login } = useAuth();

  const demoAccounts = [
    {
      title: 'Company Dashboard',
      description: 'Manage your fleet, drivers, and business operations',
      icon: Building,
      credentials: {
        email: 'company@demo.com',
        password: 'demo123'
      },
      color: 'blue'
    },
    {
      title: 'Driver Dashboard',
      description: 'Accept rides, track earnings, and manage your schedule',
      icon: Car,
      credentials: {
        email: 'driver@demo.com',
        password: 'demo123'
      },
      color: 'green'
    },
    {
      title: 'Client Dashboard',
      description: 'Book rides, view history, and manage preferences',
      icon: User,
      credentials: {
        email: 'client@demo.com',
        password: 'demo123'
      },
      color: 'purple'
    }
  ];

  const handleDemoAccess = async (credentials: { email: string; password: string }) => {
    try {
      await login(credentials.email, credentials.password);
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Try Our Demo</h2>
        <p className="mt-4 text-xl text-gray-600">
          Experience CasaDrive from different perspectives
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {demoAccounts.map((account) => (
          <div 
            key={account.title}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className={`p-6 bg-${account.color}-50`}>
              <account.icon className={`h-12 w-12 text-${account.color}-600 mb-4`} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {account.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {account.description}
              </p>
              <button
                onClick={() => handleDemoAccess(account.credentials)}
                className={`w-full bg-${account.color}-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-${account.color}-700 transition-colors flex items-center justify-center`}
              >
                Try Demo
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Demo accounts are for demonstration purposes only. Data resets periodically.</p>
      </div>
    </div>
  );
}