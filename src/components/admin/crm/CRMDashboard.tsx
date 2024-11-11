import React, { useState } from 'react';
import { Search, Filter, Plus, Star, Phone, Mail, MessageSquare } from 'lucide-react';
import { CustomerList } from './CustomerList';
import { CustomerDetails } from './CustomerDetails';
import { InteractionHistory } from './InteractionHistory';

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

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (customer: Omit<Customer, 'id'>) => void;
}

function AddCustomerModal({ isOpen, onClose, onAdd }: AddCustomerModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active' as const,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      totalRides: 0,
      rating: 0,
      lastRide: 'N/A',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Customer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function CRMDashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Sophie Martin',
      email: 'sophie@example.com',
      phone: '+352 691 234 567',
      totalRides: 45,
      rating: 4.8,
      status: 'active',
      lastRide: '2024-03-15',
    },
    {
      id: '2',
      name: 'Jean Dupont',
      email: 'jean@example.com',
      phone: '+352 691 345 678',
      totalRides: 23,
      rating: 4.5,
      status: 'inactive',
      lastRide: '2024-03-10',
    },
  ]);

  const handleAddCustomer = (newCustomer: Omit<Customer, 'id'>) => {
    const customer: Customer = {
      ...newCustomer,
      id: (customers.length + 1).toString(),
    };
    setCustomers([...customers, customer]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Customer Relationship Management</h2>
        <button 
          className="btn-primary flex items-center"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className={`${selectedCustomer ? 'col-span-5' : 'col-span-12'}`}>
          <CustomerList
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSelectCustomer={setSelectedCustomer}
            selectedCustomerId={selectedCustomer?.id}
            customers={customers}
          />
        </div>

        {selectedCustomer && (
          <div className="col-span-7 space-y-6">
            <CustomerDetails customer={selectedCustomer} />
            <InteractionHistory customerId={selectedCustomer.id} />
          </div>
        )}
      </div>

      <AddCustomerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddCustomer}
      />
    </div>
  );
}