import React from 'react';
import { Users, Globe2, Shield, Clock } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export function About() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Users,
      title: t('about.expertise'),
      description: t('about.expertiseDesc')
    },
    {
      icon: Globe2,
      title: t('about.international'),
      description: t('about.internationalDesc')
    },
    {
      icon: Shield,
      title: t('about.safety'),
      description: t('about.safetyDesc')
    },
    {
      icon: Clock,
      title: t('about.availability'),
      description: t('about.availabilityDesc')
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?auto=format&fit=crop&q=80"
          alt="Luxembourg Architecture"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{t('about.title')}</h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&q=80"
              alt="Luxembourg City View"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('about.history')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('about.description')}
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">{t('about.dailyRides')}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-600">4.9</div>
                <div className="text-sm text-gray-600">{t('about.rating')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}