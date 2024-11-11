import React, { useState } from 'react';
import { X, Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  role?: 'user' | 'company' | 'driver' | 'admin';
}

export function SignInModal({ isOpen, onClose, role = 'user' }: SignInModalProps) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // For demo purposes, use predefined credentials based on role
      let email = formData.email;
      let password = formData.password;

      if (role === 'company') {
        email = 'company@demo.com';
        password = 'demo123';
      } else if (role === 'admin') {
        email = 'admin@demo.com';
        password = 'demo123';
      } else if (role === 'driver') {
        email = 'driver@demo.com';
        password = 'demo123';
      }

      await login(email, password);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    switch (role) {
      case 'admin':
        return 'Admin Login';
      case 'company':
        return 'Company Login';
      case 'driver':
        return 'Driver Login';
      default:
        return 'Sign In';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {role === 'company' ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                For demo purposes, use:<br />
                Email: company@demo.com<br />
                Password: demo123
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin h-5 w-5 mr-2" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {role === 'company' && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have a company account?{' '}
              <button 
                className="text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => {
                  onClose();
                  const event = new CustomEvent('toggleSignIn', { 
                    detail: { role: 'company', isSignUp: true } 
                  });
                  window.dispatchEvent(event);
                }}
              >
                Register your company
              </button>
            </p>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            By continuing, you agree to our{' '}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
            {' '}and{' '}
            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
}