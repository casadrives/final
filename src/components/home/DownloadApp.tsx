import React from 'react';
import { Apple, PlaySquare, Smartphone } from 'lucide-react';

export function DownloadApp() {
  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&q=80"
          alt="Luxembourg City"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get the CasaDrive App
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Download our mobile app for a seamless riding experience. Book rides, track your driver, and manage payments—all in one place.
            </p>
            
            <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
              <button className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                <Apple className="h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-base font-semibold">App Store</div>
                </div>
              </button>

              <button className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                <PlaySquare className="h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-base font-semibold">Google Play</div>
                </div>
              </button>
            </div>

            <div className="mt-8 flex items-center space-x-4 text-gray-300">
              <div className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2" />
                <span>Free Download</span>
              </div>
              <div>•</div>
              <div>Available 24/7</div>
              <div>•</div>
              <div>Easy to Use</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-8 -left-8 w-72 h-72 bg-blue-500 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-purple-500 rounded-full opacity-30 blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&q=80"
              alt="Luxembourg City View"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}