import React, { useState } from 'react';
import { MessageSquare, Filter, Search, Phone, Mail } from 'lucide-react';
import { TicketList } from './TicketList';
import { TicketDetails } from './TicketDetails';
import { AIChat } from './AIChat';

export function SupportDashboard() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAIChat, setShowAIChat] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Support Dashboard</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tickets..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button className="btn-secondary flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
          <button
            onClick={() => setShowAIChat(!showAIChat)}
            className={`btn-primary flex items-center ${showAIChat ? 'bg-blue-100 text-blue-600' : ''}`}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            AI Support
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className={`${selectedTicket || showAIChat ? 'col-span-5' : 'col-span-12'}`}>
          <TicketList
            searchTerm={searchTerm}
            onSelectTicket={setSelectedTicket}
            selectedTicketId={selectedTicket?.id}
          />
        </div>
        
        {selectedTicket ? (
          <div className="col-span-7 h-[calc(100vh-13rem)]">
            <TicketDetails ticket={selectedTicket} />
          </div>
        ) : showAIChat ? (
          <div className="col-span-7 h-[calc(100vh-13rem)]">
            <AIChat />
          </div>
        ) : null}
      </div>
    </div>
  );
}