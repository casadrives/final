import React from 'react';
import { Activity, Upload, Download, Share2, Trash2 } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'uploaded',
      item: 'quarterly-report.pdf',
      time: '5 minutes ago',
      icon: Upload,
    },
    {
      id: 2,
      user: 'Sarah Smith',
      action: 'downloaded',
      item: 'project-assets.zip',
      time: '15 minutes ago',
      icon: Download,
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'shared',
      item: 'presentation.pptx',
      time: '1 hour ago',
      icon: Share2,
    },
    {
      id: 4,
      user: 'Emily Brown',
      action: 'deleted',
      item: 'old-backups',
      time: '2 hours ago',
      icon: Trash2,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-6">
        <Activity className="h-5 w-5 text-gray-400 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <activity.icon className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span>{' '}
                {activity.action}{' '}
                <span className="font-medium">{activity.item}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}