import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Phone, Mail, Download } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalRides: number;
  rating: number;
  lastRide?: string;
  preferredLocations: string[];
  spentAmount: number;
  status: 'active' | 'inactive';
}

export function CompanyCRM() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const customers: Customer[] = [
    {
      id: '1',
      name: 'Sophie Martin',
      email: 'sophie@example.com',
      phone: '+352 691 234 567',
      totalRides: 45,
      rating: 4.8,
      lastRide: '2024-03-15',
      preferredLocations: ['Luxembourg Airport', 'Kirchberg'],
      spentAmount: 1250.50,
      status: 'active'
    },
    {
      id: '2',
      name: 'Jean Dupont',
      email: 'jean@example.com',
      phone: '+352 691 345 678',
      totalRides: 23,
      rating: 4.5,
      lastRide: '2024-03-10',
      preferredLocations: ['Gare Centrale', 'Cloche d\'Or'],
      spentAmount: 780.25,
      status: 'active'
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCustomerData = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Total Rides', 'Rating', 'Spent Amount', 'Status'],
      ...customers.map(customer => [
        customer.name,
        customer.email,
        customer.phone,
        customer.totalRides.toString(),
        customer.rating.toString(),
        customer.spentAmount.toFixed(2),
        customer.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'customer-data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Customer Relationship Management</h2>
        <button 
          onClick={exportCustomerData}
          className="btn-primary flex items-center"
        >
          <Download className="h-5 w-5 mr-2" />
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Customer List */}
        <div className={`${selectedCustomer ? 'col-span-5' : 'col-span-12'}`}>
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
                  onClick={() => setSelectedCustomer(customer)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    selectedCustomer?.id === customer.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{customer.name}</h3>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">{customer.rating}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-500">{customer.totalRides} rides</span>
                    <span className="text-gray-500">€{customer.spentAmount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Details */}
        {selectedCustomer && (
          <div className="col-span-7">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{selectedCustomer.name}</h2>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{selectedCustomer.rating} rating</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  selectedCustomer.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedCustomer.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{selectedCustomer.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Ride Statistics</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-900">Total Rides: {selectedCustomer.totalRides}</p>
                    <p className="text-sm text-gray-900">Total Spent: €{selectedCustomer.spentAmount.toFixed(2)}</p>
                    <p className="text-sm text-gray-900">Last Ride: {selectedCustomer.lastRide}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Preferred Locations</h3>
                <div className="space-y-2">
                  {selectedCustomer.preferredLocations.map((location, index) => (
                    <div key={index} className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{location}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}