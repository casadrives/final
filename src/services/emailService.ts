import { Driver } from '../types/driver';

interface EmailConfig {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const EMAIL_CONFIG = {
  ADMIN_EMAIL: 'admin@casadrives.com',
  FROM_EMAIL: 'admin@casadrives.com',
};

export const emailService = {
  async sendEmail(config: EmailConfig) {
    // In production, this would use a real email service like SendGrid, AWS SES, etc.
    console.log('Sending email:', config);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  },

  async sendClientSignupNotification(userData: { name: string; email: string; phone: string }) {
    // Send notification to admin
    await this.sendEmail({
      from: EMAIL_CONFIG.FROM_EMAIL,
      to: EMAIL_CONFIG.ADMIN_EMAIL,
      subject: 'New Client Registration',
      html: `
        <h2>New Client Registration</h2>
        <p>A new client has registered on CasaDrive:</p>
        <ul>
          <li><strong>Name:</strong> ${userData.name}</li>
          <li><strong>Email:</strong> ${userData.email}</li>
          <li><strong>Phone:</strong> ${userData.phone}</li>
        </ul>
        <p>Please review their information in the admin dashboard.</p>
      `
    });

    // Send welcome email to client
    await this.sendEmail({
      from: EMAIL_CONFIG.FROM_EMAIL,
      to: userData.email,
      subject: 'Welcome to CasaDrive',
      html: `
        <h2>Welcome to CasaDrive!</h2>
        <p>Dear ${userData.name},</p>
        <p>Thank you for registering with CasaDrive. We're excited to have you on board!</p>
        <p>You can now:</p>
        <ul>
          <li>Book rides through our platform</li>
          <li>Track your ride history</li>
          <li>Save favorite destinations</li>
          <li>Rate your drivers</li>
        </ul>
        <p>If you have any questions, our support team is here to help.</p>
        <p>Best regards,<br>The CasaDrive Team</p>
      `
    });
  },

  async sendDriverSignupNotification(driverData: Driver) {
    // Send notification to admin
    await this.sendEmail({
      from: EMAIL_CONFIG.FROM_EMAIL,
      to: EMAIL_CONFIG.ADMIN_EMAIL,
      subject: 'New Driver Application',
      html: `
        <h2>New Driver Application</h2>
        <p>A new driver has applied to join CasaDrive:</p>
        <ul>
          <li><strong>Name:</strong> ${driverData.name}</li>
          <li><strong>Email:</strong> ${driverData.email}</li>
          <li><strong>Phone:</strong> ${driverData.phone}</li>
          <li><strong>Vehicle:</strong> ${driverData.vehicle?.make} ${driverData.vehicle?.model} (${driverData.vehicle?.year})</li>
          <li><strong>License Plate:</strong> ${driverData.vehicle?.licensePlate}</li>
        </ul>
        <p>Please review their application in the admin dashboard.</p>
      `
    });

    // Send confirmation email to driver
    await this.sendEmail({
      from: EMAIL_CONFIG.FROM_EMAIL,
      to: driverData.email,
      subject: 'CasaDrive Driver Application Received',
      html: `
        <h2>Driver Application Received</h2>
        <p>Dear ${driverData.name},</p>
        <p>Thank you for applying to become a CasaDrive driver. We have received your application and our team will review it shortly.</p>
        <p>Next steps:</p>
        <ol>
          <li>Our team will review your application</li>
          <li>We'll verify your documents</li>
          <li>You'll be invited for an orientation session</li>
          <li>Complete safety training</li>
          <li>Start accepting rides!</li>
        </ol>
        <p>We aim to process applications within 2-3 business days. We'll keep you updated on your application status.</p>
        <p>Best regards,<br>The CasaDrive Team</p>
      `
    });
  }
};