import schedule from 'node-schedule';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Schedule report generation for 1st day of each month at 00:01
schedule.scheduleJob('1 0 1 * *', async function() {
  console.log('Starting monthly commission report generation...');
  
  try {
    // In production, fetch drivers and their commission data from your database
    const drivers = await fetchDriversData();
    
    for (const driver of drivers) {
      // Generate PDF report
      const pdf = generateDriverReport(driver);
      
      // Save PDF to storage
      await savePDFToStorage(pdf, driver);
      
      // Send email with PDF attachment
      await sendReportEmail(driver, pdf);
      
      // Schedule automatic block check after 24 hours
      scheduleBlockCheck(driver);
      
      console.log(`Report sent successfully to ${driver.email}`);
    }
    
    console.log('Monthly commission reports generated and sent successfully');
  } catch (error) {
    console.error('Error generating monthly reports:', error);
    // Implement error notification system for admins
  }
});

// Schedule payment check and automatic block for each driver
function scheduleBlockCheck(driver) {
  const blockTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
  
  schedule.scheduleJob(blockTime, async function() {
    try {
      // Check if payment has been received
      const paymentStatus = await checkPaymentStatus(driver.id);
      
      if (!paymentStatus.paid) {
        // Block driver
        await blockDriver(driver.id);
        
        // Send notification to driver
        await sendBlockNotification(driver);
        
        // Send notification to admin
        await notifyAdmin(driver, 'DRIVER_BLOCKED');
        
        console.log(`Driver ${driver.id} blocked due to unpaid commission`);
      }
    } catch (error) {
      console.error(`Error checking payment status for driver ${driver.id}:`, error);
    }
  });
}

function generateDriverReport(driver) {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.text('CasaDrive', 20, 20);
  doc.setFontSize(14);
  doc.text('Monthly Commission Report', 20, 30);
  
  // Add payment deadline warning
  doc.setTextColor(255, 0, 0);
  doc.text('IMPORTANT: Payment must be made within 24 hours to avoid account suspension', 20, 40);
  doc.setTextColor(0, 0, 0);
  
  // Add driver details
  doc.setFontSize(12);
  doc.text(`Driver: ${driver.name}`, 20, 60);
  doc.text(`Month: ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`, 20, 70);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 80);
  doc.text(`Payment Due: ${new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()}`, 20, 90);
  
  // Add commission data
  const data = [
    ['Total Rides', driver.rides],
    ['Total Revenue', `€${driver.revenue.toFixed(2)}`],
    ['Commission Rate', `${driver.commissionRate}%`],
    ['Commission Amount', `€${driver.commission.toFixed(2)}`],
  ];
  
  // @ts-ignore (jspdf-autotable types)
  doc.autoTable({
    startY: 100,
    head: [['Description', 'Amount']],
    body: data,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [66, 133, 244] },
  });
  
  return doc;
}

async function sendBlockNotification(driver) {
  const emailData = {
    to: driver.email,
    subject: 'CasaDrive - Account Suspended: Unpaid Commission',
    text: `Dear ${driver.name},\n\nYour driver account has been temporarily suspended due to unpaid commission. Please settle your outstanding payment to restore your account access.\n\nBest regards,\nCasaDrive Team`,
  };
  
  // Send email using your email service
  // await emailService.send(emailData);
}

async function notifyAdmin(driver, event) {
  // Implement admin notification logic
  console.log(`Admin notification: ${event} for driver ${driver.id}`);
}

// Mock functions for demonstration
async function checkPaymentStatus(driverId) {
  // In production, implement actual payment status check
  return { paid: false };
}

async function blockDriver(driverId) {
  // In production, implement actual driver blocking logic
  console.log(`Blocking driver ${driverId}`);
}

async function sendReportEmail(driver, pdf) {
  // Implement your email sending logic here
  const emailData = {
    to: driver.email,
    subject: `CasaDrive - Your Monthly Commission Report - ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`,
    text: `Dear ${driver.name},\n\nPlease find attached your monthly commission report.\n\nIMPORTANT: Payment must be made within 24 hours to avoid account suspension.\n\nBest regards,\nCasaDrive Team`,
    attachments: [{
      filename: `commission-report-${driver.id}.pdf`,
      content: pdf.output('arraybuffer'),
    }],
  };
  
  // Send email using your email service
  // await emailService.send(emailData);
}

// Mock function to fetch drivers data
async function fetchDriversData() {
  return [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      rides: 145,
      revenue: 2450,
      commission: 367.50,
      commissionRate: 15,
    },
  ];
}

// Mock function to save PDF to storage
async function savePDFToStorage(pdf, driver) {
  console.log(`Saving PDF for driver ${driver.id}`);
}