import React, { useState } from 'react';
import { Search, Filter, Star, Phone, Mail, MessageSquare, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalRides: number;
  totalSpent: number;
  rating: number;
  status: 'active' | 'inactive';
  lastRide?: string;
  preferredVehicleClass?: 'first' | 'business' | 'economy';
  notes?: string[];
}

export function CRMPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [newNote, setNewNote] = useState('');
  const { formatAmount } = useApp();

  // Mock customer data
  const customers: Customer[] = [
    {
      id: '1',
      name: 'Sophie Martin',
      email: 'sophie@example.com',
      phone: '+352 691 234 567',
      totalRides: 45,
      totalSpent: 1250.50,
      rating: 4.8,
      status: 'active',
      lastRide: '2024-03-15',
      preferredVehicleClass: 'business',
      notes: [
        'Prefers English-speaking drivers',
        'Regular business traveler to airport',
      ],
    },
    {
      id: '2',
      name: 'Jean Dupont',
      email: 'jean@example.com',
      phone: '+352 691 345 678',
      totalRides: 23,
      totalSpent: 780.25,
      rating: 4.5,
      status: 'active',
      lastRide: '2024-03-14',
      preferredVehicleClass: 'first',
      notes: [
        'VIP client - always assign best drivers',
        'Requires invoice for company',
      ],
    },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleAddNote = () => {
    if (!selectedCustomer || !newNote.trim()) return;

    // In production, make API call to add note
    console.log('Adding note for customer:', selectedCustomer.id, newNote);
    
    setSelectedCustomer({
      ...selectedCustomer,
      notes: [...(selectedCustomer.notes || []), newNote],
    });
    setNewNote('');
  };

  const handleExportData = () => {
    // In production, generate proper CSV/Excel file
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Total Rides', 'Total Spent', 'Rating', 'Last Ride'],
      ...filteredCustomers.map(customer => [
        customer.name,
        customer.email,
        customer.phone,
        customer.totalRides,
        customer.totalSpent,
        customer.rating,
        customer.lastRide || '',
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'customer-data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Customer Management</h2>
        <button
          onClick={handleExportData}
          className="btn-secondary flex items-center"
        >
          <Download className="h-5 w-5 mr-2" />
          Export Data
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rides
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </div>
                        {customer.preferredVehicleClass && (
                          <div className="text-xs text-gray-500">
                            Prefers: {customer.preferredVehicleClass} class
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {customer.totalRides}
                      </div>
                      {customer.lastRide && (
                        <div className="text-gray-500">
                          Last: {new Date(customer.lastRide).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatAmount(customer.totalSpent)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-900">
                        {customer.rating}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-medium mb-4">Customer Information</h4>
                <div className="space-y-3">
                  <p><span className="text-gray-500">Email:</span> {selectedCustomer.email}</p>
                  <p><span className="text-gray-500">Phone:</span> {selectedCustomer.phone}</p>
                  <p><span className="text-gray-500">Total Rides:</span> {selectedCustomer.totalRides}</p>
                  <p><span className="text-gray-500">Total Spent:</span> {formatAmount(selectedCustomer.totalSpent)}</p>
                  <p><span className="text-gray-500">Rating:</span> {selectedCustomer.rating} ★</p>
                  {selectedCustomer.preferredVehicleClass && (
                    <p><span className="text-gray-500">Preferred Class:</span> {selectedCustomer.preferredVehicleClass}</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="font-medium mb-4">Customer Notes</h4>
                <div className="space-y-4">
                  {selectedCustomer.notes?.map((note, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">{note}</p>
                    </div>
                  ))}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add a note..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={handleAddNote}
                      disabled={!newNote.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t flex justify-end space-x-4">
              <button
                onClick={() => window.location.href = `mailto:${selectedCustomer.email}`}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                Send Email
              </button>
              <button
                onClick={() => window.location.href = `tel:${selectedCustomer.phone}`}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Customer
              </button>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}