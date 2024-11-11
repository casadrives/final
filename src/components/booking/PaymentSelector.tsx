import React from 'react';
import { CreditCard, Wallet, Building, Cash } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

interface PaymentSelectorProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

export function PaymentSelector({ selectedMethod, onSelect }: PaymentSelectorProps) {
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit Card',
      icon: CreditCard,
      description: 'Pay securely with your credit or debit card'
    },
    {
      id: 'digital',
      name: 'Digital Wallet',
      icon: Wallet,
      description: 'Apple Pay, Google Pay, or PayPal'
    },
    {
      id: 'corporate',
      name: 'Corporate Account',
      icon: Building,
      description: 'Bill to your company account'
    },
    {
      id: 'cash',
      name: 'Cash',
      icon: Cash,
      description: 'Pay in cash at the end of your ride'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedMethod === method.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <method.icon className={`h-6 w-6 ${
                selectedMethod === method.id ? 'text-blue-600' : 'text-gray-400'
              }`} />
              <div className="text-left">
                <p className="font-medium">{method.name}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}