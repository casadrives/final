import React from 'react';
import { MessageSquare, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface TicketListProps {
  searchTerm: string;
  onSelectTicket: (ticket: any) => void;
  selectedTicketId?: string;
}

export function TicketList({ searchTerm, onSelectTicket, selectedTicketId }: TicketListProps) {
  const tickets = [
    {
      id: '1',
      subject: 'Lost item in vehicle',
      customer: 'Sophie Martin',
      status: 'open',
      priority: 'high',
      created: '2024-03-15 14:30',
      lastUpdate: '2024-03-15 15:45',
    },
    {
      id: '2',
      subject: 'Driver feedback',
      customer: 'Jean Dupont',
      status: 'closed',
      priority: 'medium',
      created: '2024-03-15 10:20',
      lastUpdate: '2024-03-15 11:30',
    },
  ];

  const filteredTickets = tickets.filter(ticket =>
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'closed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="divide-y divide-gray-200">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            onClick={() => onSelectTicket(ticket)}
            className={`p-4 hover:bg-gray-50 cursor-pointer ${
              selectedTicketId === ticket.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getStatusIcon(ticket.status)}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{ticket.subject}</h3>
                  <p className="text-sm text-gray-500">{ticket.customer}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                ticket.priority === 'high'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {ticket.priority}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>Created: {ticket.created}</span>
              <span>Last update: {ticket.lastUpdate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}