import React from 'react';
import { MessageSquare, Phone, Car, AlertCircle, Clock } from 'lucide-react';

interface InteractionHistoryProps {
  customerId: string;
}

export function InteractionHistory({ customerId }: InteractionHistoryProps) {
  const interactions = [
    {
      id: 1,
      type: 'message',
      content: 'Customer reported a lost item in the vehicle',
      date: '2024-03-15 14:30',
      agent: 'Marie L.',
      status: 'resolved',
    },
    {
      id: 2,
      type: 'call',
      content: 'Follow-up call about service satisfaction',
      date: '2024-03-14 11:20',
      agent: 'Pierre D.',
      status: 'completed',
    },
    {
      id: 3,
      type: 'ride',
      content: 'Completed ride from Airport to City Center',
      date: '2024-03-14 09:45',
      driver: 'John D.',
      status: 'completed',
    },
    {
      id: 4,
      type: 'complaint',
      content: 'Driver arrived 10 minutes late',
      date: '2024-03-13 16:15',
      agent: 'Sophie M.',
      status: 'resolved',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'call':
        return <Phone className="h-5 w-5 text-green-500" />;
      case 'ride':
        return <Car className="h-5 w-5 text-purple-500" />;
      case 'complaint':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Interaction History</h3>
      
      <div className="space-y-4">
        {interactions.map((interaction) => (
          <div key={interaction.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getIcon(interaction.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{interaction.content}</p>
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{interaction.date}</span>
                <span className="mx-1">•</span>
                <span>{interaction.agent || interaction.driver}</span>
                <span className="mx-1">•</span>
                <span className={`px-1.5 py-0.5 rounded-full ${
                  interaction.status === 'resolved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {interaction.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full btn-secondary">
          Load More History
        </button>
      </div>
    </div>
  );
}