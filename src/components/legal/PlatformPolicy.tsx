import React from 'react';
import { Shield, FileText, Scale, Car, Euro, AlertTriangle, Users, Clock } from 'lucide-react';

export function PlatformPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Platform Policy</h1>
          <p className="mt-4 text-gray-600">Last updated: March 15, 2024</p>
        </div>

        <div className="space-y-8">
          {/* Legal Framework */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Legal Framework</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                CasaDrive operates under Luxembourg's transportation laws and regulations, specifically:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Loi du 5 février 2016 sur les services de taxis</li>
                <li>Règlement grand-ducal du 23 novembre 2016</li>
                <li>Code de la route luxembourgeois</li>
                <li>Règlements communaux applicables</li>
              </ul>
            </div>
          </section>

          {/* Licensing Requirements */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Licensing Requirements</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Car className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Driver Requirements</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-700 space-y-2">
                    <li>Valid Luxembourg taxi driver's permit (carte de conducteur)</li>
                    <li>Minimum 2 years of driving experience</li>
                    <li>Clean criminal record (extrait de casier judiciaire)</li>
                    <li>Medical fitness certificate</li>
                    <li>Professional liability insurance</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <FileText className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Vehicle Requirements</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-700 space-y-2">
                    <li>Maximum age of 7 years</li>
                    <li>Regular technical inspections</li>
                    <li>Taxi meter compliance</li>
                    <li>Proper taxi signage and identification</li>
                    <li>Clean and well-maintained condition</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing and Fares */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Pricing and Fares</h2>
            <div className="flex items-start">
              <Euro className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-gray-700 mb-4">
                  All fares comply with Luxembourg's regulated taxi pricing structure:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Base fare: As per municipal regulations</li>
                  <li>Kilometer rate: Fixed according to zone classification</li>
                  <li>Waiting time charges: Regulated hourly rate</li>
                  <li>Night and holiday surcharges: As permitted by law</li>
                  <li>Airport and special zone rates: According to official tariffs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Service Standards */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Service Standards</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Users className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Customer Service</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-700 space-y-2">
                    <li>Professional and courteous conduct</li>
                    <li>Multilingual service (LU, FR, DE, EN)</li>
                    <li>Assistance for passengers with reduced mobility</li>
                    <li>Clear communication of fares and routes</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Operating Hours</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-700 space-y-2">
                    <li>24/7 service availability</li>
                    <li>Maximum working hours compliance</li>
                    <li>Rest period regulations</li>
                    <li>Holiday service guarantees</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Compliance and Safety */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Compliance and Safety</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Scale className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Regulatory Compliance</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-700 space-y-2">
                    <li>Regular compliance audits</li>
                    <li>Documentation maintenance</li>
                    <li>Insurance coverage verification</li>
                    <li>License renewal monitoring</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Safety Measures</h3>
                  <ul className="mt-2 list-disc list-inside text-gray-700 space-y-2">
                    <li>Regular vehicle safety inspections</li>
                    <li>Driver background checks</li>
                    <li>COVID-19 safety protocols</li>
                    <li>Emergency response procedures</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">For regulatory inquiries and compliance matters:</p>
              <div className="space-y-2">
                <p className="text-gray-700">Email: compliance@casadrive.com</p>
                <p className="text-gray-700">Phone: +352 123 456 789</p>
                <p className="text-gray-700">Address: 2 Rue du Fort Thüngen, L-1499 Luxembourg</p>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section className="border-t pt-8">
            <p className="text-sm text-gray-500">
              This policy is regularly updated to reflect changes in Luxembourg transportation laws and regulations. 
              Users will be notified of any significant changes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}