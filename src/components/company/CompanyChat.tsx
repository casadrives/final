import React, { useState } from 'react';
import { Send, Search, Phone, Video, MoreVertical, User, Radio } from 'lucide-react';
import { WalkieTalkie } from './WalkieTalkie';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'location';
}

interface Driver {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'busy';
  lastSeen?: Date;
  avatar?: string;
  unreadCount: number;
}

export function CompanyChat() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showWalkieTalkie, setShowWalkieTalkie] = useState(false);

  const [drivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'John Smith',
      status: 'online',
      unreadCount: 2,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      status: 'offline',
      lastSeen: new Date(),
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ]);

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedDriver) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'company',
      senderName: 'Company',
      content: messageInput,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search drivers..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="flex h-[calc(100%-4rem)]">
        {/* Drivers List */}
        <div className="w-80 border-r border-gray-200 overflow-y-auto">
          {filteredDrivers.map((driver) => (
            <div
              key={driver.id}
              onClick={() => setSelectedDriver(driver)}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                selectedDriver?.id === driver.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {driver.avatar ? (
                    <img
                      src={driver.avatar}
                      alt={driver.name}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                  )}
                  <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                    driver.status === 'online' ? 'bg-green-500' : 
                    driver.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{driver.name}</h3>
                    {driver.unreadCount > 0 && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {driver.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {driver.status === 'online' ? 'Online' : 
                     driver.status === 'busy' ? 'Busy' : 
                     driver.lastSeen ? `Last seen ${driver.lastSeen.toLocaleTimeString()}` : 'Offline'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        {selectedDriver ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                {selectedDriver.avatar ? (
                  <img
                    src={selectedDriver.avatar}
                    alt={selectedDriver.name}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                )}
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{selectedDriver.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedDriver.status === 'online' ? 'Online' : 
                     selectedDriver.status === 'busy' ? 'Busy' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowWalkieTalkie(!showWalkieTalkie)}
                  className={`p-2 rounded-full ${
                    showWalkieTalkie 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Radio className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
                  <Video className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'company' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] rounded-lg p-3 ${
                    message.senderId === 'company'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a driver to start chatting
          </div>
        )}
      </div>

      {/* Walkie-Talkie Component */}
      {showWalkieTalkie && selectedDriver && (
        <WalkieTalkie 
          driverId={selectedDriver.id}
          onClose={() => setShowWalkieTalkie(false)}
        />
      )}
    </div>
  );
}