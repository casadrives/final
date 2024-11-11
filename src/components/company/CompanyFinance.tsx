import React, { useState, useEffect } from 'react';
import { Download, Calendar, Filter, TrendingUp, DollarSign, Users, Clock, Settings, CreditCard, AlertTriangle, Percent } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useAuth } from '../../context/AuthContext';

interface FinanceStats {
  totalRevenue: number;
  totalRides: number;
  activeDrivers: number;
  platformCommission: number;
  commissionRate: number;
  driverCommissionRate: number;
}

interface DriverCommission {
  driverId: string;
  driverName: string;
  rides: number;
  revenue: number;
  commission: number;
  rate: number;
  lastPaid?: string;
}

export function CompanyFinance() {
  const { user, checkPaymentStatus } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  const [daysUntilDue, setDaysUntilDue] = useState<number | null>(null);
  const [showPaymentWarning, setShowPaymentWarning] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [driverCommissionRate, setDriverCommissionRate] = useState(75); // 75% to driver

  const [stats] = useState<FinanceStats>({
    totalRevenue: 45678,
    totalRides: 2345,
    activeDrivers: 142,
    platformCommission: 6851,
    commissionRate: 15,
    driverCommissionRate: 75
  });

  const [driverCommissions] = useState<DriverCommission[]>([
    {
      driverId: '1',
      driverName: 'John Smith',
      rides: 145,
      revenue: 2450,
      commission: 1837.50, // 75% of revenue
      rate: 75,
      lastPaid: '2024-03-10'
    },
    {
      driverId: '2',
      driverName: 'Sarah Wilson',
      rides: 132,
      revenue: 2180,
      commission: 1635.00,
      rate: 75,
      lastPaid: '2024-03-10'
    }
  ]);

  useEffect(() => {
    const checkDueDate = () => {
      if (user?.paymentDue) {
        const dueDate = new Date(user.paymentDue);
        const now = new Date();
        const diffTime = dueDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysUntilDue(diffDays);
        setShowPaymentWarning(diffDays <= 5);
      }
    };

    checkDueDate();
    const interval = setInterval(checkDueDate, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user?.paymentDue]);

  const handlePayCommission = () => {
    window.open('https://pay.sumup.com/b2c/QTFTT1JL', '_blank');
  };

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF();
      
      // Add header
      doc.setFontSize(20);
      doc.text('CasaDrive Financial Report', 20, 20);
      doc.setFontSize(12);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);

      // Add company info
      doc.text(`Company: ${user?.name}`, 20, 45);
      doc.text(`Period: ${new Date(selectedMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}`, 20, 55);

      // Add summary
      const summaryData = [
        ['Total Revenue', `€${stats.totalRevenue.toFixed(2)}`],
        ['Total Rides', stats.totalRides.toString()],
        ['Active Drivers', stats.activeDrivers.toString()],
        ['Platform Commission', `€${stats.platformCommission.toFixed(2)}`],
        ['Platform Commission Rate', `${stats.commissionRate}%`],
        ['Driver Commission Rate', `${stats.driverCommissionRate}%`],
      ];

      // @ts-ignore (jspdf-autotable types)
      doc.autoTable({
        startY: 70,
        head: [['Metric', 'Value']],
        body: summaryData,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [66, 133, 244] },
      });

      // Add driver commissions
      doc.text('Driver Commissions', 20, 160);
      const driverData = driverCommissions.map(d => [
        d.driverName,
        d.rides.toString(),
        `€${d.revenue.toFixed(2)}`,
        `${d.rate}%`,
        `€${d.commission.toFixed(2)}`,
        d.lastPaid || 'Not paid'
      ]);

      // @ts-ignore (jspdf-autotable types)
      doc.autoTable({
        startY: 170,
        head: [['Driver', 'Rides', 'Revenue', 'Rate', 'Commission', 'Last Paid']],
        body: driverData,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [66, 133, 244] },
      });

      doc.save(`financial-report-${selectedMonth}.pdf`);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {showPaymentWarning && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
            <div>
              <h3 className="text-red-800 font-medium">Platform Commission Payment Due Soon</h3>
              <p className="text-red-700">
                {daysUntilDue === 0 ? (
                  'Payment is due today! Your account will be suspended if payment is not received.'
                ) : daysUntilDue && daysUntilDue > 0 ? (
                  `Payment is due in ${daysUntilDue} days. Please ensure timely payment to avoid account suspension.`
                ) : (
                  'Payment is overdue. Your account has been suspended.'
                )}
              </p>
              <button
                onClick={handlePayCommission}
                className="mt-2 bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors inline-flex items-center"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Financial Overview</h2>
        <div className="flex items-center space-x-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={generateReport}
            className="btn-primary flex items-center"
            disabled={isGenerating}
          >
            <Download className="h-5 w-5 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </button>
          <button
            onClick={handlePayCommission}
            className="btn-primary flex items-center"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Pay Platform Commission
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <DollarSign className="h-6 w-6 text-green-500" />
            <span className="text-sm font-medium text-green-600">+12.5%</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">
            €{stats.totalRevenue.toFixed(2)}
          </h3>
          <p className="text-sm text-gray-500">Total Revenue</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <Users className="h-6 w-6 text-blue-500" />
            <span className="text-sm font-medium text-blue-600">+5.2%</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">
            {stats.activeDrivers}
          </h3>
          <p className="text-sm text-gray-500">Active Drivers</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <TrendingUp className="h-6 w-6 text-purple-500" />
            <span className="text-sm font-medium text-purple-600">+8.1%</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">
            {stats.totalRides}
          </h3>
          <p className="text-sm text-gray-500">Total Rides</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <Settings className="h-6 w-6 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">{stats.commissionRate}%</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">
            €{stats.platformCommission.toFixed(2)}
          </h3>
          <p className="text-sm text-gray-500">Platform Commission</p>
        </div>
      </div>

      {/* Platform Commission Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Platform Commission</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Next Payment Due</p>
              <p className="font-medium">{user?.paymentDue ? new Date(user.paymentDue).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Payment</p>
              <p className="font-medium">{user?.lastPaymentDate ? new Date(user.lastPaymentDate).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Platform Commission Rate</p>
              <p className="font-medium">{stats.commissionRate}%</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-blue-500 mt-1 mr-3" />
              <div>
                <p className="font-medium text-blue-800">Payment Schedule</p>
                <p className="text-sm text-blue-600">
                  Platform commission payments are due by the 10th of each month. Late payments will result in account suspension.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Commissions Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Driver Commissions</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Driver Commission Rate:</span>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
              <Percent className="h-4 w-4 text-gray-500 mr-1" />
              <span className="font-medium">{driverCommissionRate}%</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rides</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {driverCommissions.map((driver) => (
                <tr key={driver.driverId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{driver.driverName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {driver.rides}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    €{driver.revenue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {driver.rate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    €{driver.commission.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {driver.lastPaid ? new Date(driver.lastPaid).toLocaleDateString() : 'Not paid'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1 mr-3" />
            <div>
              <p className="font-medium text-yellow-800">Commission Distribution</p>
              <p className="text-sm text-yellow-600">
                Platform takes {stats.commissionRate}% of total revenue. From the remaining {100 - stats.commissionRate}%, 
                drivers receive {driverCommissionRate}% of their rides' revenue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}