import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Download } from 'lucide-react';
import { FinanceStats } from './FinanceStats';
import { CommissionTable } from './CommissionTable';
import { RevenueChart } from './RevenueChart';
import { CommissionReports } from './CommissionReports';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export function FinanceDashboard() {
  const [isExporting, setIsExporting] = useState(false);

  const generateFinancialReport = async () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();

      // Add header
      doc.setFontSize(20);
      doc.text('CasaDrive Financial Report', 20, 20);
      doc.setFontSize(12);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);

      // Add financial summary
      doc.setFontSize(16);
      doc.text('Financial Summary', 20, 50);
      doc.setFontSize(12);

      const financialData = {
        totalRevenue: '€45,678',
        commissionEarned: '€6,851',
        driverPayouts: '€38,827',
        averageCommission: '15%',
        activeDrivers: '142',
        completedRides: '2,345',
      };

      const summaryData = [
        ['Total Revenue', financialData.totalRevenue],
        ['Commission Earned', financialData.commissionEarned],
        ['Driver Payouts', financialData.driverPayouts],
        ['Average Commission Rate', financialData.averageCommission],
        ['Active Drivers', financialData.activeDrivers],
        ['Completed Rides', financialData.completedRides],
      ];

      // @ts-ignore (jspdf-autotable types)
      doc.autoTable({
        startY: 60,
        head: [['Metric', 'Value']],
        body: summaryData,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [66, 133, 244] },
      });

      // Add monthly trends
      doc.setFontSize(16);
      doc.text('Monthly Revenue Trends', 20, 120);

      const monthlyData = [
        ['January', '€32,000', '€4,800'],
        ['February', '€28,000', '€4,200'],
        ['March', '€45,000', '€6,750'],
        ['April', '€38,000', '€5,700'],
        ['May', '€42,000', '€6,300'],
        ['June', '€48,000', '€7,200'],
      ];

      // @ts-ignore (jspdf-autotable types)
      doc.autoTable({
        startY: 130,
        head: [['Month', 'Revenue', 'Commission']],
        body: monthlyData,
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: { fillColor: [66, 133, 244] },
      });

      // Add commission breakdown
      doc.setFontSize(16);
      doc.text('Commission Breakdown', 20, 200);

      const commissionData = [
        ['Standard Rides', '€5,200'],
        ['Premium Rides', '€1,200'],
        ['Special Events', '€451'],
      ];

      // @ts-ignore (jspdf-autotable types)
      doc.autoTable({
        startY: 210,
        head: [['Category', 'Amount']],
        body: commissionData,
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
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }

      doc.save(`financial-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Financial Overview</h2>
        <button
          className="btn-primary flex items-center"
          onClick={generateFinancialReport}
          disabled={isExporting}
        >
          <Download className="h-5 w-5 mr-2" />
          {isExporting ? 'Generating Report...' : 'Export Report'}
        </button>
      </div>

      <FinanceStats />
      <RevenueChart />
      <CommissionTable />
      <CommissionReports />
    </div>
  );
}