import React, { useState } from 'react';
import { X, Send, User } from 'lucide-react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDriver: string | null;
}

export function MessageModal({ isOpen, onClose, selectedDriver }: MessageModalProps) {
  const [message, setMessage] = useState('');
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>(selectedDriver ? [selectedDriver] : []);

  if (!isOpen) return null;

  const drivers = [
    { id: '1', name: 'John Smith', status: 'online' },
    { id: '2', name: 'Sarah Wilson', status: 'busy' },
    { id: '3', name: 'Michael Brown', status: 'offline' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && selectedDrivers.length > 0) {
      // Handle message submission
      console.log('Sending message:', { message, recipients: selectedDrivers });
      onClose();
    }
  };

  const toggleDriver = (driverId: string) => {
    setSelectedDrivers(prev =>
      prev.includes(driverId)
        ? prev.filter(id => id !== driverId)
        : [...prev, driverId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Send Message</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Recipients
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {drivers.map((driver) => (
                <label
                  key={driver.id}
                  className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedDrivers.includes(driver.id)}
                    onChange={() => toggleDriver(driver.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="ml-3 flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="font-medium">{driver.name}</span>
                    <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                      driver.status === 'online'
                        ? 'bg-green-100 text-green-800'
                        : driver.status === 'busy'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {driver.status}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type your message here..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!message.trim() || selectedDrivers.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center"
            >
              <Send className="h-5 w-5 mr-2" />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}