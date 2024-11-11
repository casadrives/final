import React, { useState } from 'react';
import { Send, Bot, Loader, X } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

interface DriverAIChatProps {
  onClose?: () => void;
  minimized?: boolean;
  onToggleMinimize?: () => void;
}

export function DriverAIChat({ onClose, minimized, onToggleMinimize }: DriverAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your CasaDrive driver assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let aiResponse = "I'll connect you with driver support for more detailed assistance.";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('earnings') || lowerInput.includes('payment')) {
        aiResponse = "I can help you check your earnings and payment status. Your current week's earnings are available in the Earnings tab. Would you like me to show you how to access detailed payment information?";
      } else if (lowerInput.includes('route') || lowerInput.includes('navigation')) {
        aiResponse = "I can help you with navigation and route optimization. Would you like me to show you the best route to your current destination?";
      } else if (lowerInput.includes('customer') || lowerInput.includes('passenger')) {
        aiResponse = "For passenger-related inquiries, I can help you contact them through the app or review their profile. What specific information do you need?";
      } else if (lowerInput.includes('commission') || lowerInput.includes('fee')) {
        aiResponse = "I can explain our commission structure and help you understand your fee breakdown. The standard commission rate is 15%. Would you like to see a detailed breakdown of your recent rides?";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (minimized) {
    return (
      <button
        onClick={onToggleMinimize}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Bot className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg flex flex-col h-[500px] z-50">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-blue-600" />
          <h2 className="text-lg font-semibold">Driver Assistant</h2>
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

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <Loader className="h-5 w-5 animate-spin text-blue-600" />
            </div>
          </div>
        )}
      </div>

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
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}