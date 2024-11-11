import React from 'react';
import { Car, Clock, MapPin, Star } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Car,
      title: t('services.professional'),
      description: t('services.professionalDesc')
    },
    {
      icon: Clock,
      title: t('services.fast'),
      description: t('services.fastDesc')
    },
    {
      icon: MapPin,
      title: t('services.tracking'),
      description: t('services.trackingDesc')
    },
    {
      icon: Star,
      title: t('services.rated'),
      description: t('services.ratedDesc')
    }
  ];

  return (
    <div id="features" className="py-24 bg-white relative">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&q=80"
          alt="Luxembourg City"
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">{t('services.title')}</h2>
          <p className="mt-4 text-xl text-gray-600">{t('services.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}