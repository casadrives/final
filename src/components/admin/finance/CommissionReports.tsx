import React, { useState } from 'react';
import { FileText, Mail, Download, Calendar, AlertTriangle, Ban } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface CommissionReport {
  id: string;
  driver: string;
  email: string;
  month: string;
  rides: number;
  revenue: number;
  commission: number;
  rate: number;
  status: 'pending' | 'sent' | 'overdue';
  generatedAt?: string;
  driverStatus: 'active' | 'blocked';
  paymentDue?: string;
}

export function CommissionReports() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reports] = useState<CommissionReport[]>([
    {
      id: '1',
      driver: 'John Doe',
      email: 'john@example.com',
      month: 'March 2024',
      rides: 145,
      revenue: 2450,
      commission: 367.50,
      rate: 15,
      status: 'overdue',
      generatedAt: '2024-03-01 00:05',
      driverStatus: 'blocked',
      paymentDue: '2024-03-02 00:05',
    },
    {
      id: '2',
      driver: 'Sarah Smith',
      email: 'sarah@example.com',
      month: 'March 2024',
      rides: 132,
      revenue: 2180,
      commission: 327.00,
      rate: 15,
      status: 'sent',
      generatedAt: '2024-03-15 10:30',
      driverStatus: 'active',
      paymentDue: '2024-03-16 10:30',
    },
  ]);

  const generateAllReports = async () => {
    setIsGenerating(true);
    try {
      for (const report of reports) {
        const doc = new jsPDF();
        
        // Add CasaDrive header
        doc.setFontSize(20);
        doc.text('CasaDrive', 20, 20);
        doc.setFontSize(14);
        doc.text('Monthly Commission Report', 20, 30);
        
        // Add report details
        doc.setFontSize(12);
        doc.text(`Driver: ${report.driver}`, 20, 50);
        doc.text(`Month: ${report.month}`, 20, 60);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 70);
        
        // Add payment deadline warning
        doc.setTextColor(255, 0, 0);
        doc.text('IMPORTANT: Payment must be made within 24 hours to avoid account suspension', 20, 85);
        doc.setTextColor(0, 0, 0);
        
        // Add commission summary
        doc.text('Commission Summary', 20, 105);
        const data = [
          ['Total Rides', report.rides.toString()],
          ['Total Revenue', `€${report.revenue.toFixed(2)}`],
          ['Commission Rate', `${report.rate}%`],
          ['Commission Amount', `€${report.commission.toFixed(2)}`],
          ['Payment Due Date', new Date(report.paymentDue || '').toLocaleString()],
        ];
        
        // @ts-ignore (jspdf-autotable types)
        doc.autoTable({
          startY: 115,
          head: [['Description', 'Amount']],
          body: data,
          theme: 'grid',
          styles: { fontSize: 10 },
          headStyles: { fillColor: [66, 133, 244] },
        });
        
        // Add footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(10);
          doc.text(
            'CasaDrive Luxembourg - Monthly Commission Report',
            20,
            doc.internal.pageSize.height - 10
          );
        }
        
        // Save the PDF
        doc.save(`commission-report-${report.driver.toLowerCase().replace(' ', '-')}-${report.month.toLowerCase().replace(' ', '-')}.pdf`);

        // Simulate sending email
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`Report sent to ${report.email}`);
      }
    } catch (error) {
      console.error('Error generating reports:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Monthly Commission Reports</h3>
          <button 
            className="btn-primary flex items-center"
            onClick={generateAllReports}
            disabled={isGenerating}
          >
            <Calendar className="h-5 w-5 mr-2" />
            {isGenerating ? 'Generating Reports...' : 'Generate All Reports'}
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
                Month
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Commission
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Payment Due
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">
                      {report.driverStatus === 'blocked' && (
                        <Ban className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {report.driver}
                      </div>
                      <div className="text-sm text-gray-500">{report.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    €{report.commission.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {report.rides} rides
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    report.status === 'sent'
                      ? 'bg-green-100 text-green-800'
                      : report.status === 'overdue'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {report.paymentDue && (
                    <div className="text-sm">
                      <div className={`font-medium ${
                        report.status === 'overdue' ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {new Date(report.paymentDue).toLocaleString()}
                      </div>
                      {report.status === 'overdue' && (
                        <div className="text-red-600 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Payment Overdue
                        </div>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        const doc = new jsPDF();
                        doc.text('Test', 10, 10);
                        doc.save('test.pdf');
                      }}
                      className="p-2 text-gray-400 hover:text-gray-500"
                      title="Download PDF"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        console.log('Sending report to', report.email);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-500"
                      title="Send Report"
                    >
                      <Mail className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}