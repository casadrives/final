import React, { useState } from 'react';
import { Plus, Search, Filter, Star, Car, Mail, Phone, Ban, Check } from 'lucide-react';
import { AddDriverModal } from './drivers/AddDriverModal';

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  status: 'active' | 'inactive' | 'pending';
  rating: number;
  rides: number;
  joinDate: string;
}

export function DriversManagement() {
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+352 123 456 789',
      vehicle: 'Mercedes S-Class (LUX 1234)',
      status: 'active',
      rating: 4.8,
      rides: 145,
      joinDate: '2024-02-15',
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+352 234 567 890',
      vehicle: 'BMW 7 Series (LUX 5678)',
      status: 'pending',
      rating: 0,
      rides: 0,
      joinDate: '2024-03-15',
    },
  ]);

  const handleAddDriver = async (driverData: any) => {
    try {
      // In a real app, this would be an API call
      const newDriver: Driver = {
        id: (drivers.length + 1).toString(),
        name: driverData.name,
        email: driverData.email,
        phone: driverData.phone,
        vehicle: `${driverData.vehicleMake} ${driverData.vehicleModel} (${driverData.vehiclePlate})`,
        status: 'pending',
        rating: 0,
        rides: 0,
        joinDate: new Date().toISOString().split('T')[0],
      };

      setDrivers([...drivers, newDriver]);
      setShowAddDriver(false);
    } catch (error) {
      console.error('Error adding driver:', error);
    }
  };

  const handleStatusChange = async (driverId: string, newStatus: 'active' | 'inactive') => {
    try {
      setDrivers(drivers.map(driver => 
        driver.id === driverId 
          ? { ...driver, status: newStatus }
          : driver
      ));
    } catch (error) {
      console.error('Error updating driver status:', error);
    }
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Driver Management</h2>
        <button 
          onClick={() => setShowAddDriver(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Driver
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
                placeholder="Search drivers..."
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
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {driver.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {driver.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Joined {new Date(driver.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{driver.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{driver.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm">{driver.vehicle}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      driver.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : driver.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{driver.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {driver.rides} rides
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {driver.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleStatusChange(driver.id, 'active')}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            title="Approve"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(driver.id, 'inactive')}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Reject"
                          >
                            <Ban className="h-5 w-5" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(driver.id, driver.status === 'active' ? 'inactive' : 'active')}
                          className={`p-1 rounded ${
                            driver.status === 'active'
                              ? 'text-red-600 hover:bg-red-50'
                              : 'text-green-600 hover:bg-green-50'
                          }`}
                          title={driver.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {driver.status === 'active' ? (
                            <Ban className="h-5 w-5" />
                          ) : (
                            <Check className="h-5 w-5" />
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddDriverModal
        isOpen={showAddDriver}
        onClose={() => setShowAddDriver(false)}
        onAdd={handleAddDriver}
      />
    </div>
  );
}