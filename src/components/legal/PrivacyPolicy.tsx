import React from 'react';
import { Shield, Lock, Eye, Database, Globe, Mail } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-4 text-gray-600">Last updated: March 15, 2024</p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700">
              CasaDrive ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our ride-sharing service, website, and mobile application. Please read this privacy policy carefully.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Database className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-700 space-y-2">
                    <li>Name, email address, and phone number</li>
                    <li>Payment information and billing address</li>
                    <li>Driver's license and vehicle information (for drivers)</li>
                    <li>Profile pictures and user preferences</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <Globe className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Usage Information</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-700 space-y-2">
                    <li>Location data during rides</li>
                    <li>Device information and IP address</li>
                    <li>Ride history and preferences</li>
                    <li>App usage statistics and interactions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <div className="space-y-4">
              <p className="text-gray-700">We use the collected information for:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Providing and improving our services</li>
                <li>Processing payments and transactions</li>
                <li>Ensuring safety and security</li>
                <li>Communicating with you about our services</li>
                <li>Complying with legal obligations</li>
                <li>Analytics and service improvement</li>
              </ul>
            </div>
          </section>

          {/* Legal Basis for Processing */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Legal Basis for Processing (GDPR)</h2>
            <div className="space-y-4">
              <p className="text-gray-700">Under the EU GDPR, we process your data based on:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Contract performance (service delivery)</li>
                <li>Legal obligations</li>
                <li>Legitimate interests</li>
                <li>Your consent</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
            <div className="space-y-4">
              <p className="text-gray-700">We may share your information with:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Service providers and partners</li>
                <li>Law enforcement when required</li>
                <li>Other users (limited ride information)</li>
                <li>Payment processors</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
            <div className="flex items-start">
              <Lock className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-gray-700">
                  We implement appropriate technical and organizational measures to protect your personal data, including encryption, access controls, and regular security assessments. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights (GDPR)</h2>
            <div className="space-y-4">
              <p className="text-gray-700">Under GDPR, you have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request data erasure</li>
                <li>Restrict processing</li>
                <li>Data portability</li>
                <li>Object to processing</li>
                <li>Withdraw consent</li>
              </ul>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
            <p className="text-gray-700">
              We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law. When data is no longer needed, it is securely deleted or anonymized.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700">
              Your data may be transferred to and processed in countries outside the EU. We ensure appropriate safeguards are in place through Standard Contractual Clauses and adequacy decisions.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-gray-700">
                  For any questions about this Privacy Policy or our data practices, contact our Data Protection Officer:
                </p>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">Email: privacy@casadrive.com</p>
                  <p className="text-gray-700">Address: 2 Rue du Fort Thüngen, L-1499 Luxembourg</p>
                  <p className="text-gray-700">Phone: +352 123 456 789</p>
                </div>
              </div>
            </div>
          </section>

          {/* Updates to Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          {/* Cookie Policy Link */}
          <section className="border-t pt-8">
            <p className="text-gray-700">
              For information about our use of cookies and similar technologies, please see our{' '}
              <a href="/cookie-policy" className="text-blue-600 hover:underline">
                Cookie Policy
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}