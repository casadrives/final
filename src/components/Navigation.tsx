import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface NavigationProps {
  onBackToHome: () => void;
  showBackButton?: boolean;
}

export function Navigation({ onBackToHome, showBackButton = true }: NavigationProps) {
  if (!showBackButton) return null;
  
  return (
    <button
      onClick={onBackToHome}
      className="fixed top-4 left-4 z-50 flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-50 transition-colors"
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      Back to Home
    </button>
  );
}