import React from 'react';
import { Check, Euro, CreditCard } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function SubscriptionPlans() {
  const { formatAmount } = useApp();
  
  const features = [
    'Unlimited rides',
    'Real-time tracking',
    'Customer support 24/7',
    'Earnings analytics',
    'Insurance coverage',
    'Route optimization',
    '85% commission rate',
    'Weekly payments'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Driver Subscription</h2>
        <p className="text-gray-500 mt-2">Start earning with CasaDrive today</p>
      </div>

      <div className="max-w-sm mx-auto">
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 border border-blue-200">
          <div className="flex justify-center items-baseline mb-4">
            <Euro className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-5xl font-bold text-gray-900">30</span>
            <span className="text-gray-600 ml-1">/month</span>
          </div>

          {/* Commission Rate Highlight */}
          <div className="bg-blue-600 text-white rounded-lg px-4 py-2 text-center mb-6">
            <p className="font-semibold">85% Commission Rate</p>
            <p className="text-sm">Keep more of your earnings</p>
          </div>

          <ul className="space-y-4 mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-center">
                <Check className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            <a
              href="https://pay.sumup.com/b2c/Q34W1GM9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Pay with Card
            </a>

            <a
              href="https://paypal.me/wissemneifer"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#0070BA] text-white rounded-lg px-4 py-3 font-medium hover:bg-[#003087] transition-colors flex items-center justify-center"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.067 8.478c.492.315.844.825.983 1.39.185.63.153 1.45-.153 2.453-.623 2.047-2.674 3.33-5.083 3.33h-.263c-.371 0-.688.27-.744.636l-.745 4.782-.215 1.361c-.035.227-.23.394-.46.394H9.21c-.374 0-.638-.37-.556-.728l1.04-4.588.006-.022h2.088c3.796 0 6.383-1.914 7.279-4.982.72-2.363-.218-4.026-2.26-5.232-.737-.397-1.672-.652-2.723-.73C15.114 6.34 16.016 6.95 16.857 7.72c.798.85 1.265 1.944 1.265 3.22 0 2.333-1.892 4.223-4.223 4.223H8.704l-1.47 9.33c-.036.227-.23.394-.46.394H3.346c-.374 0-.638-.37-.556-.728l3.34-14.718c.085-.374.42-.638.805-.638h6.968c2.067 0 3.846 1.062 4.823 2.675z"/>
              </svg>
              Pay with PayPal
            </a>
          </div>
        </div>

        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Commission Breakdown</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• 85% of the fare goes to you</p>
            <p>• 15% platform fee includes insurance & support</p>
            <p>• No hidden charges or additional fees</p>
            <p>• Weekly payments directly to your account</p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Cancel anytime. No hidden fees.
        </p>
      </div>
    </div>
  );
}