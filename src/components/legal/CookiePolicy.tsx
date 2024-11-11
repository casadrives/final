import React from 'react';
import { Cookie, Shield, Settings, Clock } from 'lucide-react';

export function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center mb-12">
          <Cookie className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
          <p className="mt-4 text-gray-600">Last updated: March 15, 2024</p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700">
              This Cookie Policy explains how CasaDrive ("we", "our", or "us") uses cookies and similar technologies when you visit our website or use our mobile application. This policy provides you with clear and comprehensive information about the cookies we use and the purposes for using them.
            </p>
          </section>

          {/* What Are Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. What Are Cookies?</h2>
            <p className="text-gray-700">
              Cookies are small text files that are stored on your device when you visit a website. They help to make websites work more efficiently and provide information to website owners. Cookies can be "persistent" or "session" cookies.
            </p>
          </section>

          {/* Types of Cookies We Use */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Essential Cookies</h3>
                  <p className="mt-2 text-gray-700">
                    Required for the website to function properly. They enable basic functions like page navigation and access to secure areas.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Settings className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Functional Cookies</h3>
                  <p className="mt-2 text-gray-700">
                    Help to enhance functionality and personalization, such as remembering your preferences and settings.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Analytics Cookies</h3>
                  <p className="mt-2 text-gray-700">
                    Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookie List */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Specific Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">sessionId</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Authentication</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Session</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Essential</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">preferences</td>
                    <td className="px-6 py-4 text-sm text-gray-700">User Settings</td>
                    <td className="px-6 py-4 text-sm text-gray-700">1 year</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Functional</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">_ga</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Google Analytics</td>
                    <td className="px-6 py-4 text-sm text-gray-700">2 years</td>
                    <td className="px-6 py-4 text-sm text-gray-700">Analytics</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Cookies</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                You can control and manage cookies in various ways:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Browser settings to refuse all or some cookies</li>
                <li>Delete cookies after each session</li>
                <li>Private browsing mode</li>
                <li>Our cookie consent tool</li>
              </ul>
              <p className="text-gray-700">
                Please note that blocking some types of cookies may impact your experience on our website.
              </p>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Cookies</h2>
            <p className="text-gray-700">
              Some cookies are placed by third-party services that appear on our pages. We use third-party cookies for:
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
              <li>Analytics (Google Analytics)</li>
              <li>Maps functionality (Mapbox)</li>
              <li>Payment processing</li>
              <li>Social media integration</li>
            </ul>
          </section>

          {/* Updates to Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about our Cookie Policy, please contact us:
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">Email: privacy@casadrive.com</p>
              <p className="text-gray-700">Address: 2 Rue du Fort Thüngen, L-1499 Luxembourg</p>
              <p className="text-gray-700">Phone: +352 123 456 789</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}