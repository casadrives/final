import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, X, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  }[];
}

interface ChatProps {
  driverId?: string; // For company view
  companyId?: string; // For driver view
  onClose?: () => void;
  minimized?: boolean;
  onToggleMinimize?: () => void;
}

export function CompanyDriverChat({ 
  driverId, 
  companyId, 
  onClose,
  minimized,
  onToggleMinimize 
}: ChatProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock initial messages
  useEffect(() => {
    setMessages([
      {
        id: '1',
        senderId: 'company1',
        senderName: 'LuxTaxi Services',
        content: 'Good morning! How are you today?',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: '2',
        senderId: 'driver1',
        senderName: 'John Driver',
        content: 'Good morning! All good, ready for today\'s rides.',
        timestamp: new Date(Date.now() - 1800000),
      },
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return;

    try {
      // In production, upload files to storage and get URLs
      const attachments = files.map(file => ({
        type: file.type.startsWith('image/') ? 'image' : 'file' as 'image' | 'file',
        url: URL.createObjectURL(file),
        name: file.name,
      }));

      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: user?.id || '',
        senderName: user?.name || '',
        content: input,
        timestamp: new Date(),
        attachments,
      };

      setMessages(prev => [...prev, newMessage]);
      setInput('');
      setFiles([]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  if (minimized) {
    return (
      <button
        onClick={onToggleMinimize}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg flex flex-col h-[500px] z-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
              {user?.role === 'company' ? 'D' : 'C'}
            </span>
          </div>
          <div>
            <h3 className="font-medium">
              {user?.role === 'company' ? 'Chat with Driver' : 'Chat with Company'}
            </h3>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {onToggleMinimize && (
            <button
              onClick={onToggleMinimize}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <span className="sr-only">Minimize</span>
              <span className="block w-4 h-1 bg-gray-500 rounded-full"></span>
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.senderId === user?.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.attachments?.map((attachment, index) => (
                <div key={index} className="mb-2">
                  {attachment.type === 'image' ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="max-w-full rounded-lg"
                    />
                  ) : (
                    <a
                      href={attachment.url}
                      download={attachment.name}
                      className="flex items-center space-x-2 text-sm underline"
                    >
                      <Paperclip className="h-4 w-4" />
                      <span>{attachment.name}</span>
                    </a>
                  )}
                </div>
              ))}
              {message.content && <p className="text-sm">{message.content}</p>}
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* File Previews */}
      {files.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg px-2 py-1 flex items-center space-x-2"
              >
                <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                <button
                  onClick={() => setFiles(prev => prev.filter((_, i) => i !== index))}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}