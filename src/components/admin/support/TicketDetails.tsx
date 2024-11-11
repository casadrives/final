import React from 'react';
import { User, Phone, Mail, MessageSquare, Send, Clock } from 'lucide-react';

interface TicketDetailsProps {
  ticket: any;
}

export function TicketDetails({ ticket }: TicketDetailsProps) {
  const messages = [
    {
      id: 1,
      sender: 'Sophie Martin',
      type: 'customer',
      content: 'I left my laptop in the car during my last ride.',
      timestamp: '2024-03-15 14:30',
    },
    {
      id: 2,
      sender: 'Support Agent',
      type: 'agent',
      content: 'I understand your concern. Can you provide the ride details and describe your laptop?',
      timestamp: '2024-03-15 14:35',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{ticket.subject}</h2>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            ticket.status === 'open'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {ticket.status}
          </span>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{ticket.customer}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{ticket.created}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'agent' ? 'justify-end' : ''}`}
            >
              <div className={`max-w-lg rounded-lg p-4 ${
                message.type === 'agent'
                  ? 'bg-blue-50 ml-auto'
                  : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {message.sender}
                  </span>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <p className="text-sm text-gray-700">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="btn-primary flex items-center">
            <Send className="h-5 w-5 mr-2" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}