import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Car } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export function Footer() {
  const { t } = useTranslation();
  
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/casadrive', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/casadrive', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/casadrive', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/casadrive', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/casadrive', label: 'YouTube' },
  ];

  const handleScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Car className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">CasaDrive</span>
            </div>
            <p className="text-gray-400 mb-6">
              Premium ride service in Luxembourg, connecting passengers with professional drivers for safe and comfortable journeys.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleScroll('about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll('features')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a 
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>2 Rue du Fort Thüngen</li>
              <li>L-1499 Luxembourg</li>
              <li>
                <a href="tel:+352123456789" className="hover:text-white transition-colors">
                  Phone: +352 123 456 789
                </a>
              </li>
              <li>
                <a href="mailto:info@casadrive.com" className="hover:text-white transition-colors">
                  Email: info@casadrive.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} CasaDrive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}