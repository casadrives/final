import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/home/Hero';
import { Features } from './components/home/Features';
import { About } from './components/home/About';
import { Contact } from './components/home/Contact';
import { CallToAction } from './components/home/CallToAction';
import { DownloadApp } from './components/home/DownloadApp';
import { BookRide } from './components/BookRide';
import { DemoAccess } from './components/demo/DemoAccess';
import { DriverSignupModal } from './components/auth/DriverSignupModal';
import { SignInModal } from './components/auth/SignInModal';
import { CompanySignupModal } from './components/auth/CompanySignupModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CompanyDashboard } from './components/company/CompanyDashboard';
import { DriverDashboard } from './components/driver/DriverDashboard';
import { ClientDashboard } from './components/ClientDashboard';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user } = useAuth();
  const [showDriverSignup, setShowDriverSignup] = React.useState(false);
  const [showCompanySignup, setShowCompanySignup] = React.useState(false);
  const [showSignIn, setShowSignIn] = React.useState(true);
  const [signInRole, setSignInRole] = React.useState<'user' | 'company' | 'driver' | 'admin'>('admin');

  React.useEffect(() => {
    const handleToggleSignIn = (event: CustomEvent) => {
      setSignInRole(event.detail?.role || 'user');
      setShowSignIn(true);
    };

    window.addEventListener('toggleSignIn', handleToggleSignIn as EventListener);
    return () => window.removeEventListener('toggleSignIn', handleToggleSignIn as EventListener);
  }, []);

  const handleBookRide = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDriverAccess = () => {
    setShowDriverSignup(true);
  };

  const handleCompanyAccess = () => {
    setSignInRole('company');
    setShowSignIn(true);
  };

  const handleAdminAccess = () => {
    setSignInRole('admin');
    setShowSignIn(true);
  };

  if (user) {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'company':
        return <CompanyDashboard />;
      case 'driver':
        return <DriverDashboard />;
      default:
        return <ClientDashboard />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onDriverAccess={handleDriverAccess}
        onCompanyAccess={handleCompanyAccess}
        onAdminAccess={handleAdminAccess}
      />
      
      <Hero onBookRide={handleBookRide} />
      <Features />
      <About />
      
      <div id="booking-section" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookRide />
        </div>
      </div>

      <DemoAccess />
      <Contact />
      <CallToAction 
        onBookRide={handleBookRide}
        onBecomeDriver={handleDriverAccess}
        onCompanyAccess={handleCompanyAccess}
        onAdminAccess={handleAdminAccess}
      />
      <DownloadApp />

      <DriverSignupModal 
        isOpen={showDriverSignup} 
        onClose={() => setShowDriverSignup(false)} 
      />

      <CompanySignupModal
        isOpen={showCompanySignup}
        onClose={() => setShowCompanySignup(false)}
      />

      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        role={signInRole}
      />
    </div>
  );
}