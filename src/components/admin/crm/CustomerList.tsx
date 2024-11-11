import React from 'react';
import { Search, Filter, Star } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalRides: number;
  rating: number;
  status: 'active' | 'inactive';
  lastRide: string;
}

interface CustomerListProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomerId?: string;
  customers: Customer[];
}

export function CustomerList({ 
  searchTerm, 
  setSearchTerm, 
  onSelectCustomer, 
  selectedCustomerId,
  customers 
}: CustomerListProps) {
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customers..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg"
            />
          </div>
          <button className="btn-secondary flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            onClick={() => onSelectCustomer(customer)}
            className={`p-4 hover:bg-gray-50 cursor-pointer ${
              selectedCustomerId === customer.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{customer.name}</h3>
                <p className="text-sm text-gray-500">{customer.email}</p>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">{customer.rating}</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-gray-500">{customer.totalRides} rides</span>
              <span className="text-gray-500">Last ride: {customer.lastRide}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}