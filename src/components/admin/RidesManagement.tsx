import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { RidesHeader } from './rides/RidesHeader';
import { RidesList } from './rides/RidesList';
import type { Ride } from '../../types/ride';

export function RidesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Mock ride data
  const rides: Ride[] = [
    {
      id: '1',
      customer: {
        name: 'Sophie Martin',
        phone: '+352 691 234 567',
        rating: 4.8
      },
      driver: {
        name: 'John Smith',
        vehicle: 'Mercedes S-Class (LUX 1234)'
      },
      pickup: {
        address: '2 Rue du Fort Thüngen, Luxembourg',
        coordinates: [49.6197, 6.1409]
      },
      dropoff: {
        address: '4 Place Guillaume II, Luxembourg',
        coordinates: [49.6117, 6.1319]
      },
      status: 'completed',
      amount: 25.50,
      distance: 3.2,
      duration: 15,
      requestedClass: 'Business Class',
      date: '2024-03-15 14:30'
    },
    {
      id: '2',
      customer: {
        name: 'Jean Dupont',
        phone: '+352 691 345 678',
        rating: 4.5
      },
      pickup: {
        address: '12 Avenue JF Kennedy, Luxembourg',
        coordinates: [49.6287, 6.1449]
      },
      dropoff: {
        address: '1 Place de la Gare, Luxembourg',
        coordinates: [49.6100, 6.1330]
      },
      status: 'pending',
      amount: 18.75,
      distance: 2.5,
      duration: 12,
      requestedClass: 'Economy',
      date: '2024-03-15 15:00'
    }
  ];

  const filteredRides = rides.filter(ride =>
    ride.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ride.pickup.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ride.dropoff.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (ride.driver?.name.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();

      // Add header
      doc.setFontSize(20);
      doc.text('CasaDrive Rides Report', 20, 20);
      doc.setFontSize(12);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);

      // Add summary
      const totalRides = rides.length;
      const completedRides = rides.filter(r => r.status === 'completed').length;
      const totalRevenue = rides
        .filter(r => r.status === 'completed')
        .reduce((sum, ride) => sum + ride.amount, 0);

      doc.text('Summary:', 20, 45);
      doc.text(`Total Rides: ${totalRides}`, 30, 55);
      doc.text(`Completed Rides: ${completedRides}`, 30, 65);
      doc.text(`Total Revenue: €${totalRevenue.toFixed(2)}`, 30, 75);

      // Add rides table
      const tableData = rides.map(ride => [
        ride.date,
        ride.customer.name,
        ride.driver?.name || 'Unassigned',
        ride.pickup.address,
        ride.dropoff.address,
        ride.status,
        `€${ride.amount.toFixed(2)}`,
      ]);

      // @ts-ignore (jspdf-autotable types)
      doc.autoTable({
        startY: 90,
        head: [['Date', 'Customer', 'Driver', 'Pickup', 'Dropoff', 'Status', 'Amount']],
        body: tableData,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [66, 133, 244] },
      });

      doc.save(`rides-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleViewRide = (id: string) => {
    const ride = rides.find(r => r.id === id);
    if (ride) setSelectedRide(ride);
  };

  const handleMessageRide = (id: string) => {
    console.log('Message ride:', id);
  };

  const handleAssignRide = (id: string) => {
    console.log('Assign ride:', id);
  };

  const handleCancelRide = (id: string) => {
    console.log('Cancel ride:', id);
  };

  return (
    <div className="space-y-6">
      <RidesHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onExport={handleExport}
        isExporting={isExporting}
      />
      
      <div className="bg-white rounded-lg shadow-sm">
        <RidesList
          rides={filteredRides}
          onViewRide={handleViewRide}
          onMessageRide={handleMessageRide}
          onAssignRide={handleAssignRide}
          onCancelRide={handleCancelRide}
        />
      </div>
    </div>
  );
}