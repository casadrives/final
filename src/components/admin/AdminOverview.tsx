import React from 'react';
import { Users, Car, DollarSign, AlertTriangle, Activity, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SuspendedCompany {
  id: string;
  name: string;
  email: string;
  paymentDue: string;
  status: string;
}

interface AdminOverviewProps {
  suspendedCompanies: SuspendedCompany[];
}

export function AdminOverview({ suspendedCompanies }: AdminOverviewProps) {
  const { formatAmount } = useApp();

  const stats = [
    {
      title: 'Total Users',
      value: '2,345',
      change: '+12%',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Active Drivers',
      value: '142',
      change: '+5%',
      icon: Car,
      color: 'green',
    },
    {
      title: 'Revenue',
      value: formatAmount(45678),
      change: '+23%',
      icon: DollarSign,
      color: 'yellow',
    },
    {
      title: 'Support Tickets',
      value: '12',
      change: '-8%',
      icon: MessageSquare,
      color: 'purple',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'user',
      action: 'New driver registration',
      user: 'Marc Dupont',
      time: '5 minutes ago',
    },
    {
      id: 2,
      type: 'ride',
      action: 'Completed ride',
      user: 'Sophie Martin',
      time: '15 minutes ago',
    },
    {
      id: 3,
      type: 'support',
      action: 'Customer support ticket',
      user: 'Jean Bernard',
      time: '1 hour ago',
    },
    {
      id: 4,
      type: 'payment',
      action: 'Commission payment received',
      user: 'LuxTaxi Services',
      time: '2 hours ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-gray-900">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {suspendedCompanies.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
            <div>
              <h3 className="text-red-800 font-medium">Payment Alerts</h3>
              <div className="mt-2 space-y-1">
                {suspendedCompanies.map((company) => (
                  <p key={company.id} className="text-red-700">
                    {company.name} ({company.email}) - Payment overdue since {new Date(company.paymentDue).toLocaleDateString()}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.user}</p>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Weekly Performance</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 45, 75, 55, 85, 70, 60].map((height, index) => (
              <div key={index} className="w-full">
                <div 
                  className="bg-blue-100 rounded-t"
                  style={{ height: `${height}%` }}
                >
                  <div 
                    className="bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${height * 0.7}%` }}
                  />
                </div>
                <div className="text-center mt-2 text-sm text-gray-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Car className="h-6 w-6 text-blue-500 mb-2" />
            <span className="text-sm font-medium">Add New Driver</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-6 w-6 text-green-500 mb-2" />
            <span className="text-sm font-medium">Manage Users</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mb-2" />
            <span className="text-sm font-medium">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}